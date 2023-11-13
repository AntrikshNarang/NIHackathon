import React from "react";
import HomeImg from "../../assets/home.jpg";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.mainDiv}>
      {/*  Intro/Home Section */}
      <div className={styles.homeSection}>
        <img src={HomeImg} alt="" className={styles.homeImg}></img>
        <div className={styles.homeSectionText}>
          <h1>NIH HACKATHON</h1>
          <p>National Level Hackathon by NISB, Mysore</p>
        </div>
      </div>

      {/* Info Section */}
      <div className={styles.infoSection}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.4711057092954!2d76.63857177468049!3d12.28402878797165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf65561e102919%3A0xf947b18cc5ad3d88!2sThe%20National%20Institute%20of%20Engineering%20South%20Campus%20(NIE%20South%20)!5e0!3m2!1sen!2sin!4v1699823416926!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="maps"
          className={styles.maps}
        ></iframe>
        <div className={styles.infoSectionText}>
          <p className={styles.description}>
            <span className={styles.bold}>NIH</span> (National Institute of
            Engineering Hackathon) is an All India Hackathon by NIE, Mysore.
            Coders from all over the world come together to participate and show
            their talent.
          </p>
          <p>
            <span className={styles.bold}>Date:</span> 24th - 25th November
          </p>
          <p>
            <span className={styles.bold}>Time:</span> 5:30PM IST
          </p>
          <p>
            <span className={styles.bold}>Venue:</span> GJB Block, NIE
          </p>
        </div>
      </div>

      {/* Reg Process */}
      <div className={`${styles.regSection}`}>
        <div className={styles.registrationProcess}>
          <h1>Registration Process</h1>
          <ol>
            <li>Create an account by logging in or signing up.</li>
            <li>Click on the "Register Now" button.</li>
            <li>Choose how you want to participate:
              <ul>
                <li>Create a team.</li>
                <li>Join an existing team.</li>
              </ul>
            </li>
            <li>Fill in your Details.</li>
            <li>You are now successfully registered for the event!</li>
            <li>
              After the hackathon, submit your project through the project
              submission page.
            </li>
          </ol>
        </div>
        <Link to='/register' className="btn btn-light">Register Now</Link>
      </div>

      {/* Rules Section */}
      <div className={`${styles.regSection} ${styles.rulesSection}`}>
        <div className={styles.rulesContent}>
          <h1>Rules</h1>
          <ul>
            <li>Participants must adhere to the specified coding languages and frameworks.</li>
            <li>Plagiarism of code or ideas is strictly prohibited.</li>
            <li>All submissions must be original and created during the hackathon.</li>
            <li>Teams must register and submit under their own unique team identifier.</li>
            <li>Use of any malicious software or attempts to disrupt the hackathon will result in disqualification.</li>
            <li>Participants should follow a respectful and inclusive behavior towards other participants.</li>
            <li>All decisions made by the judges are final.</li>
            <li>Teams failing to submit within the specified timeframe will be disqualified.</li>
            <li>Participants are required to attend the opening and closing ceremonies.</li>
            <li>Have fun and learn!</li>
          </ul>
        </div>
      </div>

      {/* Contact Section */}
      <div className={`${styles.contactSection} ${styles.regSection}`}>
        <div className={styles.contactContent}>
          <h1>Contact Us</h1>
          <p>If you have any questions or need further information, feel free to reach out to us:</p>
          <ul>
            <li>Email: <a href="mailto:nisb@nie.ac.in">nisb@nie.ac.in</a></li>
            <li>Phone: +91 987654321</li>
            <li>Address: 405, GJB NIE Mysore</li>
          </ul>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-3">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3 body-secondary">
          <li className="nav-item"><a href="/" className="nav-link px-2 text-secondary">Home</a></li>
          <li className="nav-item"><a href="/" className="nav-link px-2 text-secondary">Features</a></li>
          <li className="nav-item"><a href="/" className="nav-link px-2 text-secondary">Pricing</a></li>
          <li className="nav-item"><a href="/" className="nav-link px-2 text-secondary">FAQs</a></li>
          <li className="nav-item"><a href="/" className="nav-link px-2 text-secondary">About</a></li>
        </ul>
        <p className="text-center text-secondary">© 2023 Company, Inc</p>
      </footer>
    </div>
  );
};

export default Home;
