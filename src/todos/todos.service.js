const todos = [];
import { v4 as uuidv4 } from 'uuid';

const addTodo = (text) => {
    const newTodo = { id: uuidv4(), text };
    todos.push(newTodo);
    return newTodo;
};

const getAllTodos = () => todos;

const deleteTodo = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        return true;
    } else {
        throw Error('Todo not found');
    }
}

const getTodo = (id) => {
    const foundTodo = todos.find(todo => todo.id === id);
    if (!foundTodo) {
        throw Error('Todo not found');
    }
    return foundTodo;
}

const resetTodos = () => {
    todos.length = 0;
}

export const todosService = {
    addTodo,
    getTodo,
    getAllTodos,
    deleteTodo,
    resetTodos
};