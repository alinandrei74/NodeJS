import express from 'express';
   import dotenv from 'dotenv';
   import morgan from 'morgan';
   import planetRouter from './routes/planets';

   dotenv.config();

   const app = express();
   const port = process.env.PORT || 3000;

   app.use(express.json());
   app.use(morgan('dev'));

   app.use('/api/planets', planetRouter);

   app.listen(port, () => {
     console.log(`Server running on port ${port}`);
   });