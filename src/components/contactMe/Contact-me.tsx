import React from "react";
import "./contact-me.sass";
import { loadJson } from "../../util/loadJson";

function ContactForm() {

    const submit_form = () => {
        return;
    };

    return (
        <form id="ContactForm">
            <input
                type="text"
                name="Name"
                placeholder="Your Name"
                required={true}
            />
            <input
                type="email"
                name="Email"
                placeholder="Your Email"
                required={true}
            />
            <textarea name="message" rows={6} placeholder="Your Message" />
            <button type="submit" className="red-button" onClick={submit_form}>
                Submit
            </button>
        </form>
    );
}

function ContactInfo() {

    const cv_path = "cv/RomanHudaj_cv.pdf";
	const [info, setInfo] = React.useState<any>(null);

	// Load assets
    React.useEffect(() => {
        loadJson<any>("contact_info").then(setInfo)
    }, []);

	if (! info) return <></>;
    return (
        <div id="ContactInfo">
            <h1>Contact Me</h1>
            <p className="ContactPoint">
                <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                {info.email}
            </p>
            <p className="ContactPoint">
                <i className="fa-solid fa-square-phone" aria-hidden="true" />
                {info.phone}
            </p>
            <div className="social-icons">
				{
					(info.socials as any[]).map((social: any, i: number) => (
						<a key={i} href={social.link}>
                    		<i className={social.icon} />
                		</a>
					))
				}
            </div>
            <a href={cv_path} download="" className="red-button">
                Download CV
            </a>
        </div>
    );
}

// ContactMe
export function ContactMe() {
    return (
        <div id="ContactMe">
            <ContactInfo />
            <ContactForm />
        </div>
    );
}
