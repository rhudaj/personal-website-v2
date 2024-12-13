import React from "react";

function useToggle(init?: boolean): [boolean, () => void] {
    const [status, setStatus] = React.useState(init || false);
    const toggle = () => setStatus(prev => !prev);
    return [status, toggle];
};

export default useToggle;