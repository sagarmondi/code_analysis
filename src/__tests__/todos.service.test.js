import { todosService } from "../todos/todos.service";

const createTodo = (text) => {
    const { id } = todosService.addTodo(text);
    return id;
};

describe(
    'Todos Routes',
    () => {

        let todoId;

        beforeAll(
            () => {
                todoId = createTodo('Test Todo');
            }
        );

        afterAll(
            () => {
                todosService.resetTodos();
            }
        )

        it('should fetch an existing todo by ID - success', () => {
            const todo = todosService.getTodo(todoId);
            expect(todo).toBeTruthy();
            expect(todo.id).toBe(todoId);
            expect(todo.text).toBe('Test Todo');
        });

        it('should throw an error if trying to get a todo with non-existing ID - NOT FOUND - fail', () => {
            expect(() => todosService.getTodo('non-existing-id')).toThrowError('Todo not found');
        });

        it('should add a todo - success', () => {
            const text = 'New Todo';
            const newTodo = todosService.addTodo(text);
            expect(newTodo).toBeTruthy();
            expect(newTodo.text).toBe(text);
        });

        it('should return all todos - success', () => {
            const allTodos = todosService.getAllTodos();
            expect(Array.isArray(allTodos)).toBeTruthy();
            expect(allTodos.length).toBeGreaterThanOrEqual(0);
        });

        it('should delete a todo - success', () => {
            const initialTodos = todosService.getAllTodos();
            const initialLength = initialTodos.length;

            const isDeleted = todosService.deleteTodo(todoId);
            expect(isDeleted).toBe(true);

            const finalTodos = todosService.getAllTodos();
            expect(finalTodos.length).toBe(initialLength - 1);
        });

        it('should throw an error when deleting a non-existent todo - fail', () => {
            expect(() => todosService.deleteTodo('non-existent-id')).toThrow('Todo not found');
        });

    }
);
