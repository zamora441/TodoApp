import { useState } from "react";

export default function useBoolean(initialState = false) {
    const [state, setState] = useState(initialState);
    
    const handleToggle = () => setState(prevState => !prevState);
    const handleTrue = () => setState(true);
    const handleFalse = () => setState(false);

    return [
        state,
        {
            setToggle: handleToggle,
            setTrue: handleTrue,
            setFalse: handleFalse
        },
    ]
}