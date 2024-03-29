//npm i express mongodb mongoose dotenv cors cookie-parser jsonwebtoken bcryptjs
/*
//crie um arquivo .env
 // .env.example

# Porta para a aplicação
PORT=4000

# URI de conexão com o MongoDB
MONGO_URI=your_mongo_uri

# Chave de API para serviços externos
API_KEY=your_api_key

#Jwt secret
JWT_SECRET_KEY="aleatorio"
 */


import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions ={
    origin:true,
    credentials:true
}

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
        await mongoose.connect(process.env.MONGO_URL,{
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
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

app.listen(port, () =>{
    connect();
    console.log('server listening on port', port);
});