import express, { urlencoded, json } from 'express';
import { todosRoutes } from './todos/todos.routes';

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/health', (_, res) => res.json({ message: 'Server is up and running!' }));
app.use('/todos', todosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    () => {
        console.log(`Server is running on port ${PORT}`);
    }
);
