import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit : '50mb'}));


app.get('/', async(req,res) =>{
            res.send('<h1>hello From Dall-E</h1>')
})

const startServer = async () =>{

    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log('Server has started on port  http://localhost:8080'))

    } catch (error) {
            console.log(error)
    }
}

startServer();

// MONGODB_URL = "mongodb+srv://osamayounus:proDev786@cluster0.fcyton8.mongodb.net/?retryWrites=true&w=majority"