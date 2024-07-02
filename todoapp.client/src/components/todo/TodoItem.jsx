/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import iconCheck from '../../assets/icon-check.svg'
import { faCircleMinus, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import useBoolean from "../../hooks/useBoolean"
import DropdownMenu from './DropdownMenu'
import { useEffect, useRef} from 'react'


export default function TodoItem({ todo }) {
    const [isToggle, { setToggle, setFalse }] = useBoolean(false)
    const ref = useRef(null);
    const handleCloseMenu = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setFalse();
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleCloseMenu)
        return () => {
            document.removeEventListener('click', handleCloseMenu);
        }
    }, [])
    
    return (
        <>
            {todo.isComplete ?
                <img src={iconCheck} alt="Icon check" className='bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-full p-1 size-5' /> 
                : <FontAwesomeIcon icon={faCircleMinus} className='text-dark-gravish-blue text-xl'/>
                }
            <p className={`ml-2 font-semibold text-sm mt-1 ${todo.isComplete ? "line-through text-light-gravish-blue dark:text-very-dark-grayish-blue-1" : "text-very-dark-desaturated-blue dark:text-light-grayish-blue"}`}>{todo.description}</p>
            <button type='button' className='absolute right-2 mt-1' onClick={ setToggle} ref={ref}>
                <FontAwesomeIcon icon={faEllipsis} className='text-gray-400 text-lg' />
            </button>
            {isToggle &&
                <div className='absolute right-1 top-8 z-10' onClick={e => {
                       e.stopPropagation();
                }}>
                    <DropdownMenu todo={todo} closeMenu={setFalse} />
                </div>
            }
        </>
    )
}