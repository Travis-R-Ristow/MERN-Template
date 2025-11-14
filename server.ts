import { json } from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
import mongoose from 'mongoose';
import jokeRoute from './Routes/Jokes';
import userRoute from './Routes/Users';

const app = express();

const PORT = process.env.PORT || 1000;
app.use(cors());
app.use(json());

mongoose
  .connect(`mongodb+srv://chiefbuddy15:chiefbuddy15@jokecluster0.vbmlyog.mongodb.net/`)
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use(xss());
app.use(mongoSanitize());

app.use('/jokes', jokeRoute);
jokeRoute.all('*', cors());
app.use('/user', userRoute);
userRoute.all('*', cors());

app.use(express.static('./client/build'));

app.route('/sitemap').get(async (req, res) => res.sendFile('sitemap.xml', { root: './' }));

app.get('*', (req, res) => res.sendFile('build/index.html', { root: './client' }));

app.listen(PORT, () => {
  console.log('Server is running on Port:\t' + PORT);
});
