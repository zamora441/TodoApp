import {Outlet} from "react-router-dom";


export default function AuthPage() {

    return (
        <div className="h-screen relative overflow-hidden bg-light-gradient flex justify-center items-center z-0 dark:bg-dark-gradient">
            <div className="absolute -bottom-32 -left-40 size-64 md:size-80 border-4 rounded-full border-opacity-30 border-t-8 -z-10"></div>
            <div className="absolute -bottom-40 -left-20 size-64 md:size-80 border-4 rounded-full border-opacity-30 border-t-8 -z-10"></div>
            <div className="absolute -top-40 -right-0 size-64 md:size-80 border-4 rounded-full border-opacity-30 border-t-8 -z-10"></div>
            <div className="absolute -top-20 -right-20 size-64 md:size-80 border-4 rounded-full border-opacity-30 border-t-8 -z-10"></div>
            <Outlet/>
           
        </div>
    );
}