//connection to the database
import {createPool} from 'mysql'
import { config } from 'dotenv'
//calling it, so we can make use of it.
config()

let connection = createPool({
    host: process.env.DB_Host,
    database: process.env.DB_Name,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPwd,
    
    //allow the dba to install multiple value at the same time
    multipleStatements: true,

    // how many times a connection can be opened 
    connectionLimit: 30
})

export{
    connection
}