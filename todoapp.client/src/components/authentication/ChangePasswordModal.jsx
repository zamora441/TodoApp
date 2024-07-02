import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import authServiceData from "../../services/authService";

// eslint-disable-next-line react/prop-types
export default function ChangePasswordModal({closeModal }) {
    const [formData, setFormData] = useState({
        currentPassword:"",
        newPassword: "",
        confirmNewPassword: "",
    })
    const [errorMessages, setErrorMessages] = useState({})
    const [succesResponse, setSuccessResponse] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
        if ( !regex.test(formData.newPassword)) {
            const message = "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one non-alphanumeric character."
            setErrorMessages(prevState => ({...prevState, newPasswordError: message}))
        }else{
            setErrorMessages(prevState => ({...prevState, newPasswordError: undefined}))
        } 
    }

    const validateConfirmPassword = () => {
        if (formData.newPassword !== formData.confirmNewPassword) {
            const message = "Passwords don't match. Please try again."
             setErrorMessages(prevState => ({...prevState, confirmNewPasswordError: message}))
        }else {
            setErrorMessages(prevState => ({...prevState, confirmNewPasswordError: undefined}))
        }
    }

    const validateCurrentPassword = () => {
        if (errorMessages.currentPasswordError && formData.currentPassword !== "") {
            setErrorMessages(prevState => ({ ...prevState, currentPasswordError: undefined }))
        }
    }
    
    const validateEmptyInputs = () => {
        let flag = true;
        const newErrors = { ...errorMessages }
        if (formData.currentPassword === "") {
            flag = false;
            newErrors.currentPasswordError = "Current password is a required field."
        }
        if (formData.newPassword === "") {
            flag = false;
            newErrors.newPasswordError = "New password is a required field."
        } else if (errorMessages.newPasswordError) {
            flag = false;
        }
        if (formData.confirmNewPassword === "") {
            flag = false;
            newErrors.confirmNewPasswordError = "Confirm new password is a required field."
        } else if (errorMessages.confirmNewPasswordError) {
            flag = false;
        }
        setErrorMessages(newErrors)
        return flag;
    }

    const handleChangePassword = async(e) => {
        e.preventDefault();
        if (!validateEmptyInputs()) {
            return;
        } else {
            try {
                setIsSending(true);
                const data = {...formData}
                await authServiceData.changePassword(data);
                setErrorMessages({})
                setSuccessResponse(true)
                setFormData({
                    currentPassword:"",
                    newPassword: "",
                    confirmNewPassword: "",
                })
            } catch (e) {
                setSuccessResponse(false)
                setErrorMessages({responseError: e.message})
            } finally {
                setIsSending(false)
            }
        }
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 z-20 p-5 ">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="w-full sm:max-w-md bg-white p-5 pt-3 rounded-lg shadow shadow-slate-300 z-20 relative dark:bg-very-dark-blue dark:text-slate-200">
                <button type="button" onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark} className="absolute right-3 top-3 text-xl " />
                </button>
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl text-very-dark-desaturated-blue dark:text-slate-200">Change password</h1>
                    <form className="mt-5 relative flex flex-col ">
                        <div className="input-container mb-6">
                            <input type="text" name="currentPassword" value={formData.currentPassword} placeholder="Current password" className={`input ${errorMessages.currentPasswordError && "error"}`} onChange={handleOnChange} onBlur={validateCurrentPassword}/>
                            {errorMessages.currentPasswordError && 
                                <span className="error-input relative -mb-5 ml-1 mt-1">{ errorMessages.currentPasswordError}</span>
                            }
                        </div>
                        <div className="input-container mb-6">
                            <input type="password" name="newPassword" value={formData.newPassword} placeholder="New password" className={`input ${errorMessages.newPasswordError && "error"}`} onChange={handleOnChange} onBlur={validatePassword}/>
                            {errorMessages.newPasswordError && 
                                <span className="error-input relative -mb-5 ml-1 mt-1">{ errorMessages.newPasswordError}</span>
                            }
                        </div>
                        <div className="input-container mb-6">
                            <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} placeholder="Confirm new password" className={`input ${errorMessages.confirmNewPasswordError && "error"}`} onChange={handleOnChange} onBlur={validateConfirmPassword} />
                            {errorMessages.confirmNewPasswordError && 
                            <span className="error-input relative mt-1 ml-1">{errorMessages.confirmNewPasswordError}</span>
                        }
                        </div>
                        {errorMessages.responseError && <span className=" error-input relative -mt-5 mb-1 ml-1">{errorMessages.responseError }</span>}
                        {succesResponse && <span className=" text-green-500 text-xs -mt-5 mb-1 ml-1">Password changed successfully.</span>}
                        <div className="flex gap-2 justify-end">
                            <button type="button" className="modal-button bg-red-500 hover:bg-red-700 dark:bg-red-600" onClick={closeModal}>
                                Cancel
                            </button>
                            <button type="submit" className="modal-button bg-green-600 hover:bg-green-800 dark:bg-green-700 " disabled={isSending} onClick={handleChangePassword}>
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