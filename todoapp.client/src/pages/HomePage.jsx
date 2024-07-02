import { faCircleUser, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateTodo from "../components/todo/CreateTodo";
import { TodoContextProvider } from '../contexts/TodoContext';
import TodoList from "../components/todo/TodoList";
import useBoolean from "../hooks/useBoolean";
import ProfileModal from "../components/ProfileModal";


export default function HomePage() {

    const [isToggle, { setFalse, setTrue }] = useBoolean(false)

    return (
        <TodoContextProvider>
            <div className="flex min-h-screen justify-center p-0 dark:bg-very-dark-blue">
                <div className="absolute w-full h-48 md:h-52   bg-hero-image-light-mobile dark:bg-hero-image-dark-mobile bg-no-repeat bg-center bg-cover  lg:bg-hero-image-light-desktop dark:lg:bg-hero-image-dark-desktop"></div>

                <div className="flex flex-col w-full px-5 py-12 gap-4 md:w-2/3 lg:w-3/5 xl:w-1/2 z-10">
                    <nav className="flex justify-between w-full">
                        <h1 className="text-3xl font-bold tracking-[0.4rem] text-white">TODO</h1>
                        <button type="button" onClick={setTrue}>
                            <FontAwesomeIcon icon={faCircleUser} className="text-white text-3xl" />
                        </button>
                    </nav>
                    <CreateTodo/>
                    <TodoList/>
                </div>
                {isToggle && <ProfileModal closeModal={setFalse} />}
            </div>
        </TodoContextProvider>
    )
}