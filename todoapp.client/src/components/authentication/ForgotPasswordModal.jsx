import {faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import authServiceData from "../../services/authService";

// eslint-disable-next-line react/prop-types
export default function ForgotPassword({ toggleModal, cleanErrors}) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("")
    const [responseError, setResponseError] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [successReset, setSuccessReset] = useState(false);

    const isValidEmail = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email !== "" && !regex.test(email)) {
            setResponseError("")
            setEmailError("Email is not valid.");
        } else {
            setEmailError("");
        }
    }

    const handleOnChange = e => setEmail(e.target.value);

    const forgotPassword = async () => {
        try {
            setIsSending(true);
            const data = {
                email: email,
                clientResetPasswordUrl: `${import.meta.env.VITE_API_URL}/resetPassword`
            }
            await authServiceData.forgotPassword(data)
            setSuccessReset(true)
            setResponseError("");
            cleanErrors();
        } catch (error) {
            setResponseError(error.message);
        } finally {
            setIsSending(false);
        }
    }

    const handleSubmit= async (e) => {
        e.preventDefault();
        if (email === "") {
            setEmailError("Email field is required.")
            return
        } else if (emailError) {
            return;
        }
        await forgotPassword();
    }

    return (
        <div className="flex justify-center items-center fixed inset-0 z-10 p-5">
            <div className="absolute inset-0 bg-black opacity-50" onClick={toggleModal}></div>
            <div className="w-full sm:max-w-sm bg-white p-5 pt-3 rounded-lg shadow shadow-slate-300 z-20 relative dark:bg-very-dark-blue dark:text-light-grayish-blue ">
                <button type="button" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faXmark} className="absolute right-3 top-3 text-xl "/>
                </button>

                {successReset ? 
                    <div className="flex flex-col">
                        <p className="text-very-dark-desaturated-blue dark:text-light-grayish-blue ">
                            You will receive an email shortly with a temporary link to reset your password. Please check your inbox and follow the instructions provided.
                        </p>
                        <button type="button" className=" px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-2xl font-semibold duration-500 transition-all  ml-auto dark:text-purple-600 dark:hover:bg-purple-100 " onClick={toggleModal}>Close</button>
                    </div> :
                    <div className="flex flex-col">
                        <h1 className="font-bold text-2xl text-very-dark-desaturated-blue dark:text-light-grayish-blue ">Password Recovery </h1>
                        <span className=" text-very-dark-desaturated-blue dark:text-dark-grayish-blue">Enter your email to reset your password</span>
                        <form className="mt-5 relative flex flex-col ">
                            <div className="input-container mb-6">
                                <input type="email" name="email" placeholder="Email Address" className={`input ${emailError ? "border-red-400" : ""}`} onBlur={isValidEmail} onChange={handleOnChange}/>
                                {emailError && <span className="error-input -bottom-5 left-1">{emailError }</span>}
                            </div>
                            {responseError && <span className=" text-red-400 text-xs -mt-5 mb-1 ml-1">{responseError}</span>}
                            <button type="submit" className="blue-button " onClick={handleSubmit} disabled={isSending}>
                                Reset Password
                                {isSending && <svg className="size-4 border-t-transparent border-solid animate-spin rounded-full border-white border-2 ml-2" viewBox="0 0 24 24"></svg>}
                            </button>

                        </form>
                        <span className="mt-5 text-very-dark-desaturated-blue text-center dark:text-dark-grayish-blue">
                            Not registered yet? 
                            <Link to="/sign-up" className="text-blue-500 hover:underline ml-3 dark:text-purple-600">Register Now</Link>
                            </span>
                    </div>
                }
            </div>
        </div>
    )
}