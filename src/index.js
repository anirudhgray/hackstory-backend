import express from 'express';
const app = express();
const PORT = 8001;
import AuthRouter from './routers/AuthRouter.js';
import ChallengeRouter from './routers/ChallengeRouter.js';
import { connectDB } from './db/mongoose.js';

app.use(express.json());
app.use('/api/user', AuthRouter);
app.use('/api/challenge', ChallengeRouter);

connectDB();

app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
