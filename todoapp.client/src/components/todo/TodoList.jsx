/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import { useContext } from "react"
import { TodoContext } from "../../contexts/TodoContext"
import TodoFilter from "./TodoFilter";
import ConfirmationModal from "../ConfirmationModal";
import useBoolean from "../../hooks/useBoolean";

export default function TodoList() {
    const { todoList, getUserTodos, deleteCompletedTodos, incompleteTodoCounter} = useContext(TodoContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isToggle, { setTrue, setFalse }] = useBoolean(false)

    const handleDeleteCompletedTodos = async () => {
        try {
            await deleteCompletedTodos();
            setFalse();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        try {
            setIsLoading(true);
            getUserTodos();
        } catch (e) {
            console.log("error", e);
        } finally {
            setIsLoading(false)
        }

    }, [])

    return (
        isLoading ? 
            <span className="flex font-semibold text-very-dark-desaturated-blue items-center justify-center mt-[50%] dark:text-dark-grayish-blue ">
                    Getting data 
                    <div className='flex gap-1 items-center mt-1 ml-1'>
                            <span className="size-[0.3rem] bg-gray-500 rounded-full animate-pulse"></span>
                            <span className="size-[0.3rem] bg-gray-500 rounded-full animate-pulse"></span>
                            <span className="size-[0.3rem] bg-gray-500 rounded-full animate-pulse"></span>
                    </div>
            </span>
            :
            <>
                <ul className = "divide-y shadow-2xl rounded-md ">
                    {todoList && todoList.length === 0 ?
                        <li className="bg-white flex justify-between p-3 relative items-center text-sm text-dark-gravish-blue dark:bg-very-dark-desaturated-blue dark:text-dark-grayish-blue dark:border-dark-grayish-blue transition-colors duration-300 rounded-t-md">
                            Don't have todo yet
                        </li>
                        :
                        
                        todoList.map((todo) => (
                        <li key={todo.id} className="bg-white flex items-center p-3 relative first:rounded-t-md dark:bg-very-dark-desaturated-blue dark:border-dark-grayish-blue transition-colors duration-300 ">
                            <TodoItem todo={todo} />
                        </li>
                    ))}
                    <li className="bg-white flex justify-between p-3 relative items-center text-sm text-dark-gravish-blue rounded-b-md dark:bg-very-dark-desaturated-blue dark:text-dark-grayish-blue dark:border-dark-grayish-blue transition-colors duration-300">
                        <span className="">{incompleteTodoCounter } items left</span>
                        <div className="hidden sm:flex"> 
                            <TodoFilter />        
                        </div>
                        <button type="button" className="hover:text-very-dark-desaturated-blue dark:hover:text-light-grayish-blue disabled:pointer-events-none disabled:dark:text-gray-600 disabled:text-gray-200" onClick={setTrue} disabled={todoList && todoList.length === 0}>Clear completed</button>
                    </li>
                </ul >
                <div className="sm:hidden">
                    <TodoFilter/>
                </div>
                {isToggle && <ConfirmationModal closeModal={setFalse} message={"Are you sure to delete all completed tasks?"} actionFunction={handleDeleteCompletedTodos} /> }
            </>
        
        
    )
}