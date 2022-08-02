import { useEffect } from "react";
import { useLocation } from "react-router";

/** scroll window to top when navigating to a new location*/
const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{children}</>
};

export default ScrollToTop;