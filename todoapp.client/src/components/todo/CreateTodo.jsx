import { useContext, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoContext } from "../../contexts/TodoContext";

export default function CreateNewTodo() {
    const [newTodo, setNewTodo] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [responseError, setResponseError] = useState("")
    const { createTodo } = useContext(TodoContext);

    const handleOnchange = (e) => {
        const { value } = e.target;
        setNewTodo(value);
    }

    const postNewTodo = async () => {
        try {
            const data = {
                "description": newTodo
            }
            await createTodo(data)
            setNewTodo("")
            setResponseError("")
        } catch (e) {
            setResponseError(e.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo === "") {
            setResponseError("");
            setInputErrorMessage("New todo can't be empty.")
        } else {
            setInputErrorMessage("")
            postNewTodo();
        }
    }
    return (
        <>
        <form className="flex mb-2">
            <div className="input-container grow">
                <input type="text" placeholder="Create a new todo..." name="newTodo" value={newTodo} className={`input rounded-e-none p-3 ${inputErrorMessage && "error"}` } onChange={handleOnchange}/>
            </div>
            <button type="submit" className="bg-purple-500 px-3 text-white font-semibold rounded-md rounded-s-none right-0 text-sm hover:bg-purple-600 transition-colors duration-300 dark:bg-purple-800 dark:hover:bg-purple-900" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPlus} className="mr-1"/>
                Add
            </button>
        </form>
            {(responseError || inputErrorMessage) && <span className="error-input relative ml-1 -mb-3 -mt-5 dark:text-red-600">{responseError || inputErrorMessage}</span>}
        </>
    )
}