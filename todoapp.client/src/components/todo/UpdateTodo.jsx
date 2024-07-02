/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import {faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoContext } from "../../contexts/TodoContext";

export default function UpdateTodo({ todo, closeUpdate }) {
    const [newTodoDescription, setNewTodoDescription] = useState(todo.description);
    const [errorResponseMessage, setErorResponseMessage] = useState("")
    const [succesResponse, setSuccessResponse] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [blockUpdate, setBlockUpdate ] = useState(true)
    const { updateTodo } = useContext(TodoContext);

    const handleOnChange = (e) => {
        const { value } = e.target;
        setNewTodoDescription(value);
        if (value !== todo.description && value !== "") {
            setBlockUpdate(false)
        } else {
            setBlockUpdate(true)
        }
    }

    const handleUpdateTodo = async (e) => {
        e.preventDefault();
        try {
            setIsSending(true);
            const data = {
                "description": newTodoDescription
            }
            await updateTodo(data, todo.id);
            setErorResponseMessage("");
            setSuccessResponse(true);
        } catch (e) {
            setSuccessResponse(false);
            setErorResponseMessage(e.message);
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 z-10 p-5 ">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeUpdate}></div>
            <div className="w-full sm:max-w-md bg-white p-5 rounded-lg shadow shadow-slate-300 z-20 relative dark:bg-very-dark-blue dark:text-slate-200">
                <button type="button" onClick={closeUpdate} className="absolute right-3 top-3 text-xl ">
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl text-very-dark-desaturated-blue dark:text-slate-200">Update todo</h1>
                    <form className="mt-5 relative flex flex-col ">
                        <div className="input-container mb-6">
                            <input type="text" name="newTodoDescription" value={newTodoDescription } placeholder="Update todo description" className="input " onChange={handleOnChange}/>
                        </div>
                        {errorResponseMessage && <span className=" error-input relative -mt-5 mb-1 ml-1">{errorResponseMessage }</span>}
                        {succesResponse && <span className=" text-green-500 text-xs -mt-5 mb-1 ml-1">Todo update successfully.</span>}
                        <div className="flex gap-2 justify-end">
                            <button type="button" className="modal-button bg-red-500 hover:bg-red-700 dark:bg-red-600" onClick={closeUpdate}>
                                Cancel
                            </button>
                            <button type="submit" className="modal-button bg-green-600 hover:bg-green-800 dark:bg-green-700" disabled={blockUpdate || isSending} onClick={handleUpdateTodo}>
                                {isSending ?
                                    <>
                                    Updating
                                    <svg className="size-4 border-t-transparent border-solid animate-spin rounded-full border-white border-2 ml-2" viewBox="0 0 24 24"></svg>
                                    </> :
                                    <>Update</>
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}