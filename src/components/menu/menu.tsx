import "./menu.sass";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Navigation
function Navigation() {
    const handleCvClick = () => {
        const contactMeDiv = document.getElementById('ContactMe');
        const downloadCvButton = document.getElementById('download-cv-button');

        if (contactMeDiv) {
            // Scroll the ContactMe div into view
            contactMeDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Use IntersectionObserver to detect when scrolling has stopped
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    const [entry] = entries;

                    if (entry.isIntersecting) {
                        // Highlight the element once in view
                        if (downloadCvButton) {
                            downloadCvButton.classList.add('highlight');

                            // Remove highlight after 2.5 seconds
                            setTimeout(() => {
                                downloadCvButton.classList.remove('highlight');
                            }, 2500);
                        }

                        // Stop observing once the element is in view
                        observer.disconnect();
                    }
                },
                { threshold: 1.0 } // Fully visible
            );

            observer.observe(contactMeDiv);
        }
    };
    return (
        <nav id="nav-bar">
            <ul className="page-links">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/projects">Projects</NavLink>
                </li>
                <li>
                    <NavLink to="/school">School</NavLink>
                </li>
                <li>
                    <NavLink to="/art">Art</NavLink>
                </li>
                <span className="break"/>
                <li>
                    <a className="cv-li-item" onClick={handleCvClick}>
                        cv
                        <i className="fa-regular fa-file-pdf"></i>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

function FullMenu() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/"); // Navigate to the home page
    };

    return (
        <div id="FullMenu">
            <p id="Logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
                <span style={{ color: "red" }}>R</span>oman.
            </p>
            <Navigation />
        </div>
    );
}

function HiddenMenu(props: { callback: any }) {
    return (
		<div id="HiddenMenu" onClick={props.callback}>
			<p>≡</p>
		</div>
    );
}

export function Menu() {
    const [show, setShow] = useState(true);
    const scroll_threshold = 50;

    const controlNavbar = () => {
        if (show && window.scrollY > scroll_threshold) {
            // if scroll down hide the navbar
            setShow(false); // remember current page location to use in the next move
        } else if (!show && window.scrollY < scroll_threshold) {
            setShow(true);
        }
    };

    window.addEventListener("scroll", controlNavbar);

	return show ? <FullMenu /> : <HiddenMenu callback={setShow} />;
}
