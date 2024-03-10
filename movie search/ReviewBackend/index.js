import app from "./server.js"
// import reviewDAO from "./dao/reviewDAO.js";//dao is data access object 
import 'dotenv/config' 
import mongodb from "mongodb"

const { MongoClient } = mongodb;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_passoword = process.env.MONGO_PASSWORD;
// mongodb+srv://rakshit28:<password>@cluster0
const uri = `mongodb+srv://${mongo_username}:${mongo_passoword}@cluster0.3t9qxdh.mongodb.net/`;

const port = 8001; 
    
    
MongoClient.connect(
    uri,
    {
        
        writeConcern: 250,
        maxPoolSize:50,
    }
)
    .catch(err => {
        console.error(err.stack + "error in connection to the server");
        process.exit(1);
    } )
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port 8000`);
    })
})