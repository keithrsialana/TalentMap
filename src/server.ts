import express from 'express';
import apiRoutes from './routes/index.ts';
import { connectToDb } from './connection.ts';

await connectToDb();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(apiRoutes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
