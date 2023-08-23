import express  from "express";
import * as dotenv from 'dotenv';

import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js'


dotenv.config();

const router = express.Router();



router.route('/').get((req,res) =>{
    res.send('Hello From Dall-E Chicmick')
})



export default router;