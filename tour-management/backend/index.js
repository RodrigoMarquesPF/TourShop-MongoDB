//npm i express mongodb mongoose dotenv cors cookie-parser jsonwebtoken bcryptjs
/*
 // .env.example

# Porta para a aplicação
PORT=4000

# URI de conexão com o MongoDB
MONGO_URI=your_mongo_uri

# Chave de API para serviços externos
API_KEY=your_api_key
 */


import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js'


dotenv.config()
const app = express()
const port = process.env.PORT || 8000

/*
//Test
app.get("/",(req,res)=>{
    res.send("api is working");
});
*/

//database connection
mongoose.set("strictQuery", false);
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            //useNewUrlParser:true,
            //useUnifiedTopology:true

        })
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB database connection failed');
    }
};

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/tours', tourRoute);

app.listen(port, () =>{
    connect();
    console.log('server listening on port', port);
});