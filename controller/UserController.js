import express  from "express";
import bodyParser from "body-parser";
import { users } from "../models/index.js";
import { verifyToken } from "../middleware/AuthenticateUser.js";
import { errorHandling } from "../middleware/ErrorHandeling.js";


const userRouter = express.Router()

//fetch users
userRouter.get('/', async (req, res) => {
    try {
        users.fetchUsers(req, res);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: res.statusCode,
            msg: "Failed to retrieve users",
        });
        
    }
});

//fetch user
userRouter.get('/:id', async (req, res) => {
    try {
        const result = await users.fetchUser(req, res);
        if (!result) {
            res.status(404).json({
                status: 404,
                msg: "User not found",
            });
            return;
        }

        res.json({
            status: res.statusCode,
            result
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: res.statusCode,
            msg: "Failed to retrieve the user",
        });
    }
});


//add a user
//ensure the format is json when sending to server bodyParser for when using methods
userRouter.post('/register', bodyParser.json(), (req,res) => {
    try {
        users.createUser(req, res)
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to add a new user",
        })
    }
})
userRouter.delete('/:id/deleteUser', bodyParser.json(), async (req, res) => {
    try {
        await users.deleteUser(req, res);
        res.json({
            status: res.statusCode,
            msg: "User successfully deleted",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: res.statusCode,
            msg: "Failed to delete user",
        });
    }
});

userRouter.patch('/:id/alterUser', bodyParser.json(), async (req, res) => {
    try {
        await users.alterUser(req, res);
        res.json({
            status: res.statusCode,
            msg: "User details successfully updated",
        });
    } catch (e) {
        console.error(e); // Log the actual error for debugging purposes
        res.status(500).json({
            status: res.statusCode,
            msg: "Failed to change user details",
        });
    }
});

userRouter.post('/login', bodyParser.json(), async (req, res) => {
    try {
        const loginResult = await users.login(req, res);

        if (!loginResult.success) {
            res.status(loginResult.status).json({
                status: loginResult.status,
                msg: loginResult.message,
            });
            return;
        }

        res.json({
            status: res.statusCode,
            msg: "You're logged in",
            token: loginResult.token,
            result: loginResult.result,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: res.statusCode,
            msg: "Failed to login",
        });
    }
});



export{
    userRouter,express
}