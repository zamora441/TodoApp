import { faCircleUser, faMoon, faRightFromBracket, faSun, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext} from "react";
import {AuthContext } from '../contexts/AuthContext'
import { GlobalConfigContext } from "../contexts/GlobalConfigContext";
import { useNavigate } from "react-router-dom";
import useBoolean from '../hooks/useBoolean'
import ChangePasswordModal from "./authentication/ChangePasswordModal";
// eslint-disable-next-line react/prop-types
export default function ProfileModal({ closeModal }) {
    const { user, logOut  } = useContext(AuthContext)
    const { darkMode, handleLightMode, handleDarkMode } = useContext(GlobalConfigContext);
    const [openChangePassowrd, {setTrue, setFalse}] = useBoolean(false)
    const navigate = useNavigate();

    const handleLogOut= async () => {
        try {
            await logOut()
            navigate('/login')
        } catch (e) {
            console.log(e);
        }
    }

    const handleChange = () => {
        if (darkMode) {
            handleLightMode();
        } else {
            handleDarkMode();
        }
    }



    return (
        <div className="flex justify-center items-center fixed inset-0 z-10 p-5">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="w-80 bg-white p-5  rounded-lg shadow shadow-slate-300 z-20 relative flex flex-col items-center gap-1 dark:bg-very-dark-blue dark:text-white transition-colors duration-300 text-very-dark-desaturated-blue font-semibold ">
                <button type="button" onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark} className="absolute right-3 top-3 text-xl "/>
                </button>
                <FontAwesomeIcon icon={faCircleUser} className="text-very-dark-desaturated-blue dark:text-white text-5xl " />
                <h1 className="font-bold  mb-3 text-xl">My profile</h1>
                <span className="">{user && user.UserEmail}</span>
                <button type="button" className="capitalize py-1 px-3 hover:bg-slate-100 rounded-full dark:hover:bg-dark-gravish-blue" onClick={setTrue }>
                    Change password</button>
                <button type="button" onClick={handleChange} className="py-1 px-3 hover:bg-slate-100 rounded-full dark:hover:bg-dark-gravish-blue">
                    <span className="mr-1">
                        {
                            darkMode ?
                                <>
                                    <FontAwesomeIcon icon={faSun} className="mr-1" /> 
                                    Light
                                </>
                                : 
                                <>
                                    <FontAwesomeIcon icon={faMoon} className="mr-1" />
                                    Dark
                                </>
                                
                        }
                    </span>
                    Mode
                </button>
                <button type="button" className="capitalize py-1 px-3 hover:bg-slate-100 rounded-full dark:hover:bg-dark-gravish-blue"  onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-1"/>
                    Log out
                </button>
            </div>
            {openChangePassowrd && <ChangePasswordModal closeModal={setFalse}  />}
        </div>
    )
}