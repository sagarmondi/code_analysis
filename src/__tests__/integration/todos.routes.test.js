import request from 'supertest';
import express from 'express';
import { todosRoutes } from '../../todos/todos.routes';
import { todosService } from '../../todos/todos.service';

const app = express();
app.use(express.json());
app.use('/todos', todosRoutes);

const createTodo = async (text) => {
    const response = await request(app).post('/todos').send({ text });
    return response.body.todo;
};

describe(
    'Todos Routes Integration Tests',
    () => {
        let createdTodo;
        const nonExistingId = 'non-existing-id';

        beforeAll(
            async () => {
                createdTodo = await createTodo('Test Todo');
            }
        );

        afterAll(
            () => {
                todosService.resetTodos();
            }
        )

        it('should create a todo - 201 CREATED - {todo: {text: New Todo}}', async () => {
            const response = await request(app).post('/todos').send({ text: 'New Todo' });
            expect(response.status).toBe(201);
            expect(response.body.todo.text).toBe('New Todo');
        });

        it('should NOT create a todo - 400 missing text  -fail', async () => {
            const response = await request(app).post('/todos').send({});
            expect(response.status).toBe(400);
            expect(response.body.todo).not.toBeTruthy();
        });

        it('should get a todo by ID - success', async () => {
            const response = await request(app).get(`/todos/${createdTodo.id}`);
            expect(response.status).toBe(200);
            expect(response.body.todo).toBeTruthy();
            expect(response.body.todo.id).toBe(createdTodo.id);
            expect(response.body.todo.text).toBe('Test Todo');
        });

        it('should get a todo by ID - 404 NOT FOUND - fail', async () => {
            const response = await request(app).get(`/todos/${nonExistingId}`);
            expect(response.status).toBe(404);
            expect(response.body.todo).not.toBeTruthy();
            expect(response.body.message).toBe('Todo not found');
        });

        it('should delete a todo by ID - 200 success', async () => {
            const response = await request(app).delete(`/todos/${createdTodo.id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Todo deleted successfully');
        });

        it('should delete a todo by ID - 404 NOT FOUND - fail', async () => {
            const response = await request(app).delete(`/todos/${nonExistingId}`);
            expect(response.status).toBe(404);
            expect(response.body.todo).not.toBeTruthy();
            expect(response.body.message).toBe('Todo not found');
        });
    }
);
