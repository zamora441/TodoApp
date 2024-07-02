import {  useState } from "react";
import authServiceData from "../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
     const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    })
    const [errorMessages, setErrorMessages] = useState({})
    const [succesResponse, setSuccessResponse] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [searchParams] = useSearchParams();
    const userEmail = searchParams.get("email") || "";
    const resetPasswordToken = searchParams.get("token") || "";
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }
    const navigate = useNavigate();

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
    
    const validateEmptyInputs = () => {
        let flag = true;
        const newErrors = { ...errorMessages }
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

    const handlerResetPassword = async(e) => {
        e.preventDefault();
        if (!validateEmptyInputs()) {
            return;
        } else {
            try {
                setIsSending(true);
                const data = {
                    email: userEmail,
                    password: formData.newPassword,
                    confirmPassword: formData.confirmNewPassword,
                    passwordChangeToken: resetPasswordToken
                }
                await authServiceData.resetPassword(data);
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
        <div className="w-full sm:max-w-sm bg-white p-5 pt-3 rounded-lg shadow shadow-slate-300 relative dark:bg-very-dark-blue dark:text-slate-200  m-5">
            {!succesResponse ?
                <div className="flex flex-col">
                    <FontAwesomeIcon icon={faAddressCard} className="text-5xl  text-very-dark-desaturated-blue  dark:text-light-grayish-blue mb-2"/>
                    <h1 className="font-bold text-2xl text-very-dark-desaturated-blue dark:text-light-grayish-blue text-center">
                        Change password for
                    </h1>
                    <span className="text-very-dark-desaturated-blue dark:text-light-grayish-blue text-center text-lg">{userEmail}</span>
                    <form className="mt-5 relative flex flex-col ">
                        <div className="input-container mb-6">
                            <input type="password" name="newPassword" value={formData.newPassword} placeholder="New password" className={`input  ${errorMessages.newPasswordError && "error"}`} onChange={handleOnChange} onBlur={validatePassword}/>
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
                    
                        <div className="flex gap-2 justify-end">
                            <button type="submit" className="modal-button bg-green-600 hover:bg-green-800 dark:bg-green-700 " disabled={isSending} onClick={handlerResetPassword}>
                                {isSending ?
                                    <>
                                    Changing password
                                    <svg className="size-4 border-t-transparent border-solid animate-spin rounded-full border-white border-2 ml-2" viewBox="0 0 24 24"></svg>
                                    </> :
                                    <>Change password</>
                                }
                            </button>
                        </div>
                    </form>
                    </div>
                :
                <div className="flex flex-col items-center gap-3 text-very-dark-desaturated-blue dark:text-light-grayish-blue">
                     <h1 className="font-bold text-3xl ">
                        Password updated
                    </h1>
                    <FontAwesomeIcon icon={faCircleCheck} className="text-7xl " />
                    <span className="text-sm">Your password has been updated!</span>
                    <button type="button" className="modal-button bg-green-600 hover:bg-green-800 dark:bg-green-700" onClick={() =>navigate("/login")}>
                        Got to login
                    </button>
                </div>

        }
        </div>
    )
}