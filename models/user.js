
import { connection as db } from '../config/index.js'
import { hash, hashSync, compare } from 'bcrypt'
import { createToken } from '../middleware/AuthenticateUser.js'

class Users{
    fetchUsers(req,res){

        //make sure to remove the userPwd so no one can see it
        const qry = `SELECT userID, firstName, lastName, userAge, gender, emailAdd, userPwd, userRole
        FROM Users;`
        db.query(qry, (err, results) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                results,
            })
        });
    }
    fetchUser(req,res){
        const qry = `
        SELECT userID,
        firstName,
        lastName,
        userAge,
        gender,
        emailAdd,
        userPwd,
        userRole
        FROM Users 
        WHERE userID = ${req.params.id};
        `
        db.query(qry, (err, result) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                result,
            })
        })
    }
    async createUser(req,res){
        //payload
        // allow to retrieve all the data from the user (req.body)
        let data = req.body
        data.userPwd = await hash(data?.userPwd, 10)
        let user = {
            emailAdd: data.emailAdd,
            userPwd: data.userPwd
        }
        const qry = `
        INSERT INTO Users
        SET ?;
        `
        db.query(qry, [data], (err)=>{
            if(err){
                res.json({
                    status: res.statusCode,
                    msg: "Email address already exist"
                })
            }else{
                // create a token 
                let token = createToken(user)
                res.json({
                    status: res.statusCode,
                    token,
                    msg: "You're registered"
                })
            }
        })
    }
    async alterUser(req, res) {
        let data = req.body;

        // Check if the user is trying to update the password
        // if (data.userPwd) {
        //     data.userPwd = await hash(data.userPwd, 10);
        // }

        const qry = `
            UPDATE Users
            SET ?
            WHERE userID = ${req.params.id};
        `;

        db.query(qry, [data], (err) => {
            if (err) throw err 
                res.json({
                    status: res.statusCode,
                    msg: "Updating user",
                });
        
            }
        )}
    

    deleteUser(req, res) {
        const data = req.body;

        const qry = `
            DELETE FROM Users
            WHERE userID = ${req.params.id};
        `;

        db.query(qry, [data], (err) => {
            if (err) throw err
                res.json({
                    status: res.statusCode,
                    msg: "Deleted user",
                });
        });
    }

    login(req,res){
        const {emailAdd, userPwd} = req.body
        const qry = `
        SELECT userID, firstName, lastName, userAge, gender, emailAdd, userPwd, userRole
        FROM Users
        WHERE emailAdd = '${emailAdd}';`
        db.query(qry,async(err, result)=>{
            if(err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "You provided a wrong email address."
                })
            }else{
                //validate password
                const validPass = await compare(userPwd, result[0].userPwd)
                if(validPass){
                    const token = createToken({
                        emailAdd,
                        userPwd
                    })
                    res.json({
                        status: res.statusCode,
                        msg: "You're logged in",
                        token,
                        result: result[0],
                    })
                }else{
                    res.json({
                        status: res.statusCode,
                        msg: "Please provide the correct password"
                    })
                }
            }
        })
    }
}
export{
    Users
}
