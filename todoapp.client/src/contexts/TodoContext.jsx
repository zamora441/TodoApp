import { createContext, useState } from "react";
import todoServiceData from "../services/todoService";

export const TodoContext = createContext()

// eslint-disable-next-line react/prop-types
export  function TodoContextProvider({ children }) {
    const [todoList, setTodoList] = useState([]);
    const [todoListCache, setTodoListCache] = useState([]);
    const [incompleteTodoCounter, setIncompleteTodoCounter] = useState(0);
    
    const getUserTodos = async () => {
        const response = await todoServiceData.getUserTodos();
        const newTodoList = response.data;
        setTodoList(newTodoList)
        setTodoListCache(newTodoList)
        setIncompleteTodoCounter(newTodoList.filter(todo => !todo.isComplete).length);
    }

    const createTodo = async (data) => {
        const response = await todoServiceData.createTodo(data);
        const newTodo = response.data;
        setTodoList((prevState) => [...prevState, newTodo]);
        setTodoListCache((prevState) => [...prevState, newTodo]);
        setIncompleteTodoCounter(prevState => prevState + 1);
    }

    const updateTodo = async (data, todoId)=>{
        await todoServiceData.updateTodo(data, todoId);
        const index = todoList.findIndex(todo => todo.id === todoId);
        const newTodoList = [...todoListCache]
        newTodoList[index].description = data.description;
        updateLists(newTodoList);
    }

    const completeTodo = async (todoId) => {
        await todoServiceData.completeTodo(todoId);
        const index = todoList.findIndex(todo => todo.id === todoId);
        const newTodoList = [...todoListCache];
        newTodoList[index].isComplete = true;
        updateLists(newTodoList);
        setIncompleteTodoCounter(prevState => prevState - 1);
    }

    const deleteTodo = async (todoId) => {
        await todoServiceData.deleteTodo(todoId);
        const index = todoList.findIndex(todo => todo.id === todoId);
        const newTodoList = [...todoListCache];
        if (!newTodoList[index].isComplete) {
            setIncompleteTodoCounter(prevState => prevState - 1);
        }
        newTodoList.splice(index, 1);
        updateLists(newTodoList);
    }

    const deleteCompletedTodos = async () => {
        await todoServiceData.deleteCompletedTodos();
        const newTodoList = [...todoListCache]
        updateLists(newTodoList.filter(todo => !todo.isComplete));
    }

    const updateLists = (newList) => {
        setTodoList(newList)
        setTodoListCache(newList)
    }

    const value = {
        getUserTodos,
        createTodo,
        updateTodo,
        completeTodo,
        deleteTodo,
        deleteCompletedTodos,
        todoList,
        setTodoList,
        todoListCache,
        setTodoListCache,
        incompleteTodoCounter
    }

    return (<TodoContext.Provider value={value}>{children}</TodoContext.Provider>)
} 