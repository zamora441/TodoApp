/* eslint-disable react/prop-types */
import { faCircleCheck, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBoolean from "../../hooks/useBoolean";
import UpdateTodo from "./UpdateTodo";
import ConfirmationModal from "../ConfirmationModal"
import { useContext} from "react";
import { TodoContext } from "../../contexts/TodoContext";
import ErrorModal from "../ErrorModal";

// eslint-disable-next-line react/prop-types
export default function DropdownMenu({ todo, closeMenu}) {
    const [showUpdateTodo, { setToggle: updateToggle, setFalse: closeUpdate }] = useBoolean(false)
    const [showConfirmComplete, {setTrue: openConfirmComplete, setFalse:closeConfirmComplete }] = useBoolean(false);
    const [showConfirmDelete, {setTrue: openConfirmDelete, setFalse:closeConfirmDelete }] = useBoolean(false);
    const { completeTodo, deleteTodo } = useContext(TodoContext)
    const [showErrorModal, {setTrue: openErrorModal, setFalse:closeErrorModal }] = useBoolean(false);
    
    const handleCompleteTodo = async (e) => {
        e.preventDefault();
        try {
            await completeTodo(todo.id);
            closeMenu()
            closeConfirmComplete();
        } catch (e) {
            openErrorModal()
        } 
    }

    const handleDeleteTodo = async (e) => {
        e.preventDefault();
        try {
            await deleteTodo(todo.id);
            closeConfirmDelete();
        } catch (e) {
            openErrorModal()
        } 
    }

    return (
        <>
            <ul className="bg-white p-2 text-[0.8rem]  text-gray-500 font-semibold flex flex-col gap-2 w-fit shadow rounded dark:bg-very-dark-desaturated-blue shadow-slate-300 dark:shadow-slate-500">
                {!todo.isComplete && 
                    <>
                        <li>
                            <button type="button" className="hover:text-very-dark-desaturated-blue transition-colors duration-300 dark:hover:text-light-grayish-blue dark:text-dark-grayish-blue " onClick={updateToggle}>
                                <FontAwesomeIcon icon={faPen} className="mr-1"/>
                                Edit todo
                            </button>
                        </li>
                        <li>
                            <button type="button" className="hover:text-very-dark-desaturated-blue transition-colors duration-300 dark:hover:text-light-grayish-blue dark:text-dark-grayish-blue " onClick={openConfirmComplete}>
                                <FontAwesomeIcon icon={faCircleCheck} className="mr-1 text-"/>
                                Mark as completed
                            </button>
                        </li>
                    </>
                }
                <li className="text-red-600">
                    <button type="button" className="hover:text-red-800 transition-colors duration-300 dark:hover:text-red-500" onClick={openConfirmDelete}>
                        <FontAwesomeIcon icon={faTrashCan} className="mr-1"/>
                        Delete todo
                    </button>
                </li>
            </ul>
            {showUpdateTodo && <UpdateTodo todo={todo} closeUpdate={closeUpdate} />}

            {showConfirmComplete && <ConfirmationModal closeModal={closeConfirmComplete} message={"Are you sure you mark this task as completed?"} actionFunction={handleCompleteTodo} />}
            
            {showConfirmDelete && <ConfirmationModal closeModal={closeConfirmDelete} message={"Are you sure you want to delete this todo?"} actionFunction={handleDeleteTodo}/> }
            {showErrorModal && <ErrorModal closeModal={closeErrorModal}/>}
        </>

    )
}