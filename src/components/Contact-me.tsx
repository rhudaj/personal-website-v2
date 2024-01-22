import './contact-me.css'

function ContactForm () {

  const submit_form = () => {
    return;
  };

  return (
    <form id="ContactForm">
      <input type="text" name="Name" placeholder="Your Name" required={true}/>
      <input type="email" name="Email" placeholder="Your Email" required={true}/>
      <textarea name="message" rows={6} placeholder="Your Message"/>
      <button type="submit" className="red-button" onClick={submit_form}>Submit</button>
    </form>
  );
}

function ContactInfo () {
  return (
    <div id="ContactInfo">
        <h1>Contact Me</h1>
        <p className="ContactPoint">
          <i className="fa-solid fa-paper-plane" aria-hidden="true"/>
          rhudaj@uwaterloo.ca
        </p>
        <p className="ContactPoint">
          <i className="fa-solid fa-square-phone" aria-hidden="true"/>
          647-502-0512
        </p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/rhudaj"><i className="fa-brands fa-linkedin"/></a>
          <a href="https://www.instagram.com/rhudaj/"><i className="fa-brands fa-instagram"/></a>
          <a href="https://github.com/RomanHudaj11"><i className="fa-brands fa-github"/></a>
        </div>
        <a href="CV/RomanHudaj_Resume.pdf" download="" className="red-button">Download CV</a>
      </div>
  );
}

export function ContactMe () {
  return (
    <div id="ContactMe">
      <ContactInfo/>
      <ContactForm/>
    </div>
  );
}