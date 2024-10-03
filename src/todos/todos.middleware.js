const validateTodoInput = (req, res, next) => {
    const { text } = req.body;
    if (text == null) {
        return res.status(400).send({ message: 'Text is required' });
    }
    if (typeof text !== 'string') {
        return res.status(400).send({ message: 'Text must be a string' });
    }

    if (text.trim() === '') {
        return res.status(400).send({ message: 'Text cannot be empty' });
    }
    next();
}

export const todosMiddleware = {
    validateTodoInput,
}