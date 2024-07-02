import { useState } from "react";
import { Link } from "react-router-dom";
import authServiceData from "../../services/authService";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBoolean from "../../hooks/useBoolean";

export default function Register() {
    const [formData, setFormData] = useState({
        emailAddress:"",
        password: "",
        confirmPassword: ""
    })
    const [formErrors, setFormErrors] = useState({
    })
    const [responseError, setResponseError] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState(false)
    const [showPassword, { setToggle }] = useBoolean(false);
    const [showConfirmPassword, { setToggle:toggleConfirmPassword }] = useBoolean(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState, [name]: value }))
    }

    const ValidateEmail = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (formData.emailAddress !== "" && !regex.test(formData.emailAddress)) {
            setFormErrors(prevState => ({...prevState, emailError: "Email is not valid."}))
        } else if (formData.emailAddress === "") {
            setFormErrors(prevState => ({...prevState, emailError: "Email is a field required."}))
        } else {
            setFormErrors(prevState => ({...prevState, emailError: undefined}))
        }
    }

    const validatePassword = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
        if (!regex.test(formData.password)) {
            const message = "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one non-alphanumeric character."
            setFormErrors(prevState => ({...prevState, passwordError: message}))
        } else {
            setFormErrors(prevState => ({...prevState, passwordError: undefined}))
        }
    }

    const validateConfirmPassword = () => {
        if (formData.password !== formData.confirmPassword) {
            const message = "Passwords don't match. Please try again."
             setFormErrors(prevState => ({...prevState, confirmPasswordError: message}))
        } else {
            setFormErrors(prevState => ({...prevState, confirmPasswordError: undefined}))
        }
    }

    const validInputs = () => {
        let flag = true;
        const errors = {...formErrors};
        if (formData.emailAddress === "") {
            errors.emailError = "Email address is a field required."
            flag = false;
        } else if (formErrors.emailError) {
            flag = false;
        }

        if (formData.password === "") {
            errors.passwordError = "Password is a field required."
            flag = false;
        } else if (formErrors.passwordError) {
            flag = false;
        }

        if (formData.confirmPassword === "") {
            errors.confirmPasswordError = "Confirm password is a field required."
            flag = false;
        } else if (formErrors.confirmPasswordError) {
            flag=false
        }

        setFormErrors(errors);
        return flag;
    }
    
    const register = async () => {
        try {
            setIsSending(true);
            const data = {
                ...formData,
                clienteConfirmationEmailUrl:`${import.meta.env.VITE_API_URL}/confirmationEmail`
            };
            await authServiceData.register(data);
            setFormErrors({});
            setResponseError("")
            setResponseSuccess(true);
            setFormData({
                emailAddress:"",
                password: "",
                confirmPassword: ""
            })
        } catch (error) {
            setResponseError(error.message);
        } finally {
            setIsSending(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validInputs()) { 
            return;
        }
        await register();
    }

    return (
        <div className="bg-white rounded-md shadow-2xl flex flex-col p-5 z-10  w-full sm:max-w-md dark:bg-very-dark-blue dark:text-dark-grayish-blue m-5">
            {!responseSuccess ? 
                <>
                <h1 className="font-bold text-3xl text-very-dark-desaturated-blue text-center mb-5 dark:text-dark-grayish-blue">Sign up</h1>
                <form className="flex flex-col gap-4 ">
                    <div className="input-container mb-1">
                        <input type="email" placeholder="Email Address" name="emailAddress" className={`input ${formErrors.emailError && "error"}`} value={formData.emailAddress} onChange={handleOnChange} onBlur={ValidateEmail}/>
                        {formErrors.emailError && 
                            <span className="error-input -bottom-5 left-1">{formErrors.emailError }</span>
                        }
                    </div>
                    <div className="input-container mb-2">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className={`input ${formErrors.passwordError && "error"}`} value={formData.password} onChange={handleOnChange} onBlur={validatePassword} />
                            {formData.password &&
                                <button type="button" className="absolute right-2 top-3" onClick={setToggle}>
                                    {showPassword ?
                                        <FontAwesomeIcon icon={faEyeSlash} /> 
                                    :
                                        <FontAwesomeIcon icon={faEye} /> 
                                    }
                                </button>
                            }
                            {formErrors.passwordError && 
                                <span className="error-input relative -mb-5 ml-1 mt-1">{ formErrors.passwordError}</span>
                            }
                    </div>
                    <div className="input-container mb-2">
                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className={`input ${formErrors.confirmPasswordError  && "error"}`} value={formData.confirmPassword} onChange={handleOnChange}  onBlur={validateConfirmPassword}/>
                        {formData.confirmPassword &&
                        <button type="button" className="absolute right-2 top-3" onClick={toggleConfirmPassword}>
                            {showConfirmPassword ?
                                <FontAwesomeIcon icon={faEyeSlash} /> 
                            :
                                <FontAwesomeIcon icon={faEye} /> 
                            }
                        </button>
                     }
                            {formErrors.confirmPasswordError && 
                            <span className="error-input relative mt-1 ml-1">{formErrors.confirmPasswordError}</span>
                        }
                    </div>
                    {responseError && 
                        <span className="error-input relative ml-1 -mb-2 -mt-5 ">{responseError}</span>
                    }
                    <button type="submit" className="blue-button" onClick={handleSubmit} disabled={isSending }>
                        Create Account
                        {isSending && 
                            <svg className="size-4 border-t-transparent border-solid animate-spin rounded-full border-white border-2 ml-2" viewBox="0 0 24 24"></svg>
                        }
                    </button>
                </form>
                <span className="mt-5 text-very-dark-desaturated-blue dark:text-dark-grayish-blue ">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 hover:underline dark:text-purple-600"> Sign in here</Link>
                </span>
                </> :
                <>
                    <h1 className="font-bold text-3xl text-very-dark-desaturated-blue text-center mb-2 dark:text-dark-grayish-blue">Registration completed successfully!</h1>
                    <p className="text-very-dark-desaturated-blue text-center dark:text-dark-grayish-blue">Please check your email for a confirmation link to complete your registration.
                    </p>
                    <div className="flex flex-col justify-center items-center gap-3 mt-4 sm:flex-row">
                        <button to="/sign-up" className="modal-button w-auto text-base bg-gray-500 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-700  " onClick={()=>{setResponseSuccess(false)}}> Back to </button>
                        <Link to="/login" className="modal-button w-auto text-medium text-base dark:bg-purple-800 dark:hover:bg-purple-900"> Continue to login</Link>
                    </div>
                </>
            }
        </div>
    )
}