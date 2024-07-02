import { useContext, useState } from "react"
import { TodoContext } from "../../contexts/TodoContext";

const filters = ["all", 'active', 'completed']

export default function TodoFilter() {
    const { setTodoList, todoListCache} = useContext(TodoContext)
    const [currentFilter, setCurrentFilter] = useState("all")

    const applyFilter = (e) => {
        const { name } = e.target;
        if (name === "all") {
            setCurrentFilter(name)
            setTodoList(todoListCache);
        } else if (name === "active") {
            setCurrentFilter(name);
            setTodoList(todoListCache.filter(todo=> !todo.isComplete));
        } else {
            setCurrentFilter(name);

            setTodoList(todoListCache.filter(todo=> todo.isComplete));
        }
    }
    return (
        <div className="w-full p-3 bg-white  rounded-md shadow-2xl flex justify-center gap-3 sm:shadow-none sm:gap-7 sm:w-auto sm:p-0 dark:bg-very-dark-desaturated-blue transition-colors duration-300">
            {filters && filters.map((filter, index) => (
                <button className={` text-sm font-bold hover:text-very-dark-desaturated-blue dark:hover:text-light-grayish-blue capitalize ${filter === currentFilter ? "text-bright-blue" : "text-dark-gravish-blue dark:text-dark-grayish-blue "}`} name={filter} onClick={applyFilter} key={index}>
                    {filter}
                </button>
            )) }
        </div>
    )
}