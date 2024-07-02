import httpCommon from "../http-common";

const getUserTodos = () => httpCommon.get("/tasks");

const createTodo = (data) => httpCommon.post("/tasks", data);

const updateTodo = (data, todoId) => httpCommon.put(`/tasks/${todoId}`, data);

const completeTodo = (todoId) => httpCommon.patch(`/tasks/${todoId}`);

const deleteTodo = (todoId) => httpCommon.delete(`/tasks/${todoId}`);

const deleteCompletedTodos = () =>
    httpCommon.delete("/tasks/deleteCompletedTasks");

const todoServiceData = {
    getUserTodos,
    createTodo,
    updateTodo,
    completeTodo,
    deleteTodo,
    deleteCompletedTodos,
};

export default todoServiceData;
