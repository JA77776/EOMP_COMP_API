import { config } from "dotenv"
config()
import  jwt  from "jsonwebtoken"
const {sign, verify} = jwt

function createToken(user){
    return sign({
        emailAdd: user.emailAdd,
        userPwd: user.userPwd
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    }
    )
}

function verifyToken(req,res,next){
    //retrieve a token from the browser
    const token = req?.headers['Authorization']
    if(token){
        if(verify(token, process.env.SECRET_KEY)){
            next()
        }else{
            // (?) avoid undefined answers no errors
            res?.json({
                status: res.statusCode,
                msg: 'Please provide the correct credentials',
            })
        }
    }else {
        res?.json({
            status: res.statusCode,
            msg: "Please login.",
        });
    }
}

export{
    createToken,
    verifyToken
}