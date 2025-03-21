import "./menu.sass";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PageRoute, routes } from "../../pages";
import { useMediaQuery } from 'react-responsive'


const ScrollToCV = (props: {
    target_div_id: string,
    target_button_id: string,
}) => {

    const handleClick = () => {

        const targetDiv = document.getElementById(props.target_div_id);
        const targetButton = document.getElementById(props.target_button_id);

        if (!targetDiv || !targetButton) {
            console.warn("Couldn't find divs: 'ContactMe' and/or 'download-cv-button'")
            return;
        }

        // Scroll the ContactMe div into view
        targetDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Use IntersectionObserver to detect when scrolling has stopped (asynchronously)
        const observer = new IntersectionObserver((entries, observer) => {
            const [ entry ] = entries; // most recent entry (I think)
            console.log('Entry: ', entry);
            if (entry.isIntersecting) {

                // Highlight the element once in view
                targetButton.classList.add('highlight');

                // Remove highlight after 2.5 seconds
                setTimeout(() => {
                    targetButton.classList.remove('highlight');
                }, 2500);

                // Stop observing once the element is in view
                observer.disconnect();
            }
        }, {
            threshold: 1.0 // fully visible
        });

        // observe the desired div
        observer.observe(targetDiv);
    };


    return (
        <a className="cv-li-item" onClick={handleClick}>
            CV
            <i className="fa-regular fa-file-pdf"></i>
        </a>
    );
};

// Navigation
function NavBar() {
    return (
        <nav>
            <ul id="page-links">
                {/* LINK TO EACH PAGE ROUTE */}
                {routes.map((pr: PageRoute)=>
                    <li>
                        <NavLink to={pr.path}>{pr.name}</NavLink>
                    </li>
                )}
                {/* LINK TO THE CV AT THE BOTTOM OF THE PAGE */}
                <li>
                    <ScrollToCV target_div_id="ContactMe" target_button_id="download-cv-button"/>
                </li>
            </ul>
        </nav>
    );
}

function FullMenu(props: { isVertical?: boolean }) {

    const navigate = useNavigate();

    const handleLogoClick = () => {
        // Navigate to the home page
        navigate("/");
    };

    return (
        <div id="FullMenu" className={props.isVertical ? 'vertical' : 'horizontal'}>
            <p id="Logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
                <span style={{ color: "red" }}>R</span>oman.
            </p>
            <NavBar />
        </div>
    );
}

function CollapsedMenuToggle(props: { onClick: any }) {
    return (
		<div id="HiddenMenu" onClick={props.onClick}>
			<p>≡</p>
		</div>
    );
}

/**
 * Displays the `FullMenu` or the `HiddenMenu`
 * @returns
 */
export function Menu() {
    const [show, setShow] = useState(true); // show the full menu?
    const [isVertical, setIsVertical] = useState(false);

    const scroll_threshold = 50;
    const screen_w_threshold = 750;

    useEffect(()=>{
        checkScreenWidth();
        window.addEventListener("scroll", controlNavbar);
        window.addEventListener("resize", checkScreenWidth);
    }, []);

    // Hide/show based on scroll position
    const controlNavbar = () => {``
        if (show && window.scrollY > scroll_threshold) {
            // if scroll down hide the navbar
            setShow(false); // remember current page location to use in the next move
        } else if (!show && window.scrollY < scroll_threshold) {
            setShow(true);
        }
    };

    // Hide/show and set orientation based on width of screen
    const checkScreenWidth = () => {
        if(window.innerWidth < screen_w_threshold) {
            setShow(false)
            setIsVertical(true);
        } else {
            setShow(true)
            setIsVertical(false)
        }
    };


	return show ? <FullMenu isVertical={isVertical}/> : <CollapsedMenuToggle onClick={setShow} />;
}
