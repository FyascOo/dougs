import cors from 'cors';
import express from 'express';
import { categories } from './categories';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());

app.get('/all-categories', (req, res) => {
  res.json(categories);
});

app.get('/visible-categories', (req, res) => {
  const fakeVisibleCategories = categories.filter(category => category.id % 3 === 0).map(({ id }) => ({ id }));

  res.json(fakeVisibleCategories);
});

app.get('*', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
