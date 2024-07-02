import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
export default function ConfirmationModal({ closeModal, message, actionFunction}) {

    return (
        <div className="flex justify-center items-center fixed inset-0 z-20 p-5">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="max-w-sm bg-white p-5  rounded-lg shadow shadow-slate-300 z-20 relative dark:bg-very-dark-blue flex flex-col items-center">
                <FontAwesomeIcon icon={faCircleExclamation} className="text-6xl text-red-500 mb-3 dark:text-red-600 text-center"/>
                <h1 className="font-bold text-2xl text-very-dark-desaturated-blue text-center dark:text-slate-200 ">{message}</h1>
                    <div className="flex gap-2 mt-3">
                        <button type="button" className="modal-button bg-red-600 hover:bg-red-800 dark:bg-red-700" onClick={closeModal}>
                            Cancel
                        </button>
                    <button type="button" className="modal-button bg-green-600 hover:bg-green-800 dark:bg-green-700" onClick={actionFunction}>
                        Confirm
                        </button>
                    </div>
                </div>
        </div>
    )
}