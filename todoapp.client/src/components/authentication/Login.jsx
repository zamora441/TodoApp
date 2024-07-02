import { faAt, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import useBoolean from '../../hooks/useBoolean'
import ForgotPasswordModal from "./ForgotPasswordModal";
import useAuth from '../../hooks/useAuth'
import { useState } from "react";


export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [isSending, setIsSending] = useState(false);
    const [isToggle, { setTrue, setFalse }] = useBoolean(false);
    const [responseError, setResponseError] = useState("")
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, { setToggle }] = useBoolean(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const isValidEmail = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (formData.email !== "" && !regex.test(formData.email)) {
            setEmailError("Email is not valid.");
        } else {
            setEmailError("");
        }
    }

    const validateFields = () => {
        let flag = true;
        if (formData.email === "") {
            setEmailError("Email address is a required field.")
            flag =false
        } else if (emailError) {
            flag = false;
        }
        if (formData.password === "") {
            setPasswordError("Password is a required field.")
            flag = false
        } else {
            setPasswordError("");
        }
        return flag
    }

    const handleLogin = async () => {
        try {
            setIsSending(true);
            const loginCredentials = {
                ...formData,
                clientResetPasswordUrl: `${import.meta.env.VITE_API_URL}/resetPassword`
            }
            await login(loginCredentials)
            navigate("/")
            setResponseError("")
        } catch (error) {
            setResponseError(error.message);
        } finally {
            setIsSending(false);
        }
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            setResponseError("")
            return;
        }
        await handleLogin();
    }

    const cleanErrors = ()=>{
        setEmailError("");
        setPasswordError("");
        setResponseError("");
    }

    return (
        <div className="bg-white rounded-md shadow-2xl flex flex-col p-5  w-full sm:max-w-md dark:bg-very-dark-blue dark:text-dark-grayish-blue mx-5">
            <h1 className="font-bold text-3xl text-very-dark-desaturated-blue dark:text-light-grayish-blue ">Hello Again!</h1>
            <span className="mb-5 text-very-dark-desaturated-blue dark:dark:text-dark-grayish-blue  ">Welcome Back</span>
            <form className="flex flex-col gap-4 relative">
                <div className="input-container mb-2">
                    <FontAwesomeIcon icon={faAt} className="absolute top-3 left-2 text-slate-400" />
                    <input type="email" placeholder="Email Address" className={`input pl-8 ${emailError && "error"}`} name="email" value={formData.email} onChange={handleChange} onBlur={isValidEmail}/>
                    {emailError && <span className="error-input -bottom-5 left-1">{emailError }</span>}
                </div>
                <div className="input-container mb-2">
                    <FontAwesomeIcon icon={faLock} className="absolute top-3 left-2 text-slate-400"/>
                    <input type={showPassword ? "text" : "password"} placeholder="Password" className={`input px-8 ${passwordError && "error"}`} name="password" value={formData.value} onChange={handleChange} />
                    {formData.password &&
                        <button type="button" className="absolute right-2 top-3" onClick={setToggle}>
                            {showPassword ?
                                <FontAwesomeIcon icon={faEyeSlash} /> 
                            :
                                <FontAwesomeIcon icon={faEye} /> 
                            }
                        
                        </button>
                     }
                    {passwordError && <span className="error-input -bottom-5 left-1">{passwordError }</span>}
                </div>
                {responseError && <span className="text-red-400 text-xs -mb-2 -mt-5 ml-1">{responseError}</span>}
                <button type="submit" className="blue-button mt-0  " disabled={isSending} onClick={handleSubmit}>
                    Login
                    {isSending && <svg className="size-4 border-t-transparent border-solid animate-spin rounded-full border-white border-2 ml-2" viewBox="0 0 24 24"></svg>}
                </button>
            </form>
            <div className="flex justify-between text-sm mt-5 ">
                <button type="button" className="hover:text-bright-blue tras hover:-translate-y-1 duration-500 transition-all dark:hover:text-purple-600" onClick={setTrue}>Forgot Password?</button>
                <Link to="/sign-up" className="hover:text-bright-blue tras hover:-translate-y-1 duration-500 transition-all text-center sm:text-start dark:hover:text-purple-600">Don`t have an account yet?</Link>
            </div>

            {isToggle && <ForgotPasswordModal toggleModal={setFalse} cleanErrors={cleanErrors} />}
            
        </div>
    )
}