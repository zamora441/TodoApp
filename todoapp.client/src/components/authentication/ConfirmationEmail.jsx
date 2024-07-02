import { useContext, useEffect, useState } from 'react'
import confetti from '../../assets/confetti.svg'
import darkConfetti from '../../assets/confetti-dark.svg'
import { useNavigate, useSearchParams } from 'react-router-dom';
import authServiceData from '../../services/authService';
import { GlobalConfigContext } from '../../contexts/GlobalConfigContext'

export default function ConfirmationEmailPage() {
    let [searchParams] = useSearchParams();
    const [isSending, setIsSending] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [seconds, setSeconds] = useState(5);
    const navigate = useNavigate();
    const { darkMode } = useContext(GlobalConfigContext)
    
    const sendConfirmation = async () => {
        try {
            const data = {
                email: searchParams.get("email") || "" ,
                confirmationEmailToken: searchParams.get("confirmationToken") || "",
            };
            if (!data.email || !data.confirmationEmailToken ) {
                throw new Error("Missing email or confirmationToken in query string.")
            }
            const token = await authServiceData.confirmEmail(data);
            console.log("token",token);
            setIsSending(false);
            let count =0 ;
            const timer = setInterval(() => {
                if (count < 4) {
                    count++;
                    setSeconds(prevState => prevState - 1);
                }else {
                    clearInterval(timer); 
                    navigate("/")
                }
            }, 1000);
        } catch (e) {
            setIsSending(false);
            setResponseError(e.message);
        }
    }

    useEffect(() => {
        sendConfirmation();
    },[])

    return (
            <div className="w-full flex flex-col justify-center items-center bg-white px-2 py-10 gap-3 dark:bg-very-dark-blue">
                {isSending ? 
                    <div className="flex mt-2 font-semibold dark:text-dark-grayish-blue">
                        Sending confirmation
                        <div className='flex gap-1 items-center mt-1 ml-1'>
                            <span className="size-[0.3rem] bg-gray-500 rounded-full animate-pulse"></span>
                            <span className="size-[0.3rem] bg-gray-500 rounded-full animate-pulse"></span>
                            <span className="size-[0.3rem] bg-gray-500 rounded-full animate-pulse"></span>
                        </div>
                    </div> :
                responseError ?
                    <h1 className='text-red-500 text-center'>{responseError}</h1> :
                    <>
                    <div className='flex flex-col items-center justify-center '>
                        <img src={darkMode ? darkConfetti : confetti} alt="Confetti img" />
                        <h1 className='uppercase text-sm font-semibold text-very-dark-desaturated-blue mt-1 dark:text-dark-grayish-blue'>Thanks for joining</h1>
                    </div>
                    <h2 className='uppercase font-bold text-3xl text-very-dark-desaturated-blue mt-5 text-center dark:text-dark-grayish-blue'>Your registration is complete.</h2>
                    <div className="flex mt-2 dark:text-dark-grayish-blue">
                        Redirecting to home in {seconds}
                    </div>
                    </>
                }
           </div>
    )
    
}