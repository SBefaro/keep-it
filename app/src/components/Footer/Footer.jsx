import './Footer.css'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return(
      <div className="footer-container">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/stefanobefaro/" target="_blank" rel="noopener noreferrer" aria-label="linkedin"><FaLinkedinIn className='linkedin'/></a>
          <a href="https://github.com/SBefaro" target="_blank" rel="noopener noreferrer" aria-label="github"><FaGithub className='github'/></a>
        </div>
        <hr className="footer__hr"/>
        <p className="footer__text">&copy; Made with &hearts;</p>
      </div>
    )
}

export default Footer