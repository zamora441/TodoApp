/* eslint-disable react/prop-types */
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ErrorModal({closeModal }) {

  return (
    <div className="flex justify-center items-center fixed inset-0 z-20 p-5">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="max-w-sm bg-white p-6  rounded-lg shadow shadow-slate-300 z-20 relative dark:bg-very-dark-blue flex flex-col ">
                <FontAwesomeIcon icon={faCircleXmark} className="text-6xl text-red-500 mb-3 dark:text-red-600"/>
                <h1 className="font-bold text-2xl text-very-dark-desaturated-blue text-center dark:text-slate-200 flex flex-col">
                    Sorry, something went wrong.
                </h1>
                <span className="font-semibold text-xl text-center"> Please try again.</span>
                <button type="button" className="modal-button bg-red-600 hover:bg-red-800 dark:bg-red-700 mt-2" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>
  )
}
