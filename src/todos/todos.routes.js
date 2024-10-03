import { Router } from 'express';
import { todosService } from './todos.service';
import { todosMiddleware } from './todos.middleware';

const todosRouter = Router();

todosRouter.get('/', (_req, res) => res.send(todosService.getAllTodos()));

todosRouter.get(
    '/:id',
    (req, res) => {
        const id = req.params.id;
        try {
            const todo = todosService.getTodo(id);
            return res.status(200).send({ todo });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
);

todosRouter.post(
    '/',
    todosMiddleware.validateTodoInput,
    (req, res) => {
        const text = req.body.text;
        const todo = todosService.addTodo(text);
        res.status(201).send({ todo });
    }
);

todosRouter.delete(
    '/:id',
    (req, res) => {
        try {
            const id = req.params.id;
            todosService.deleteTodo(id);
            return res.status(200).send({ message: 'Todo deleted successfully' });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
);

export { todosRouter as todosRoutes };
