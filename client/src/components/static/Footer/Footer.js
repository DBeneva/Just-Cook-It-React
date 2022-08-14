import { Link } from 'react-router-dom';

import './Footer.scss';

function Footer() {
    return (
        <div className="Footer">
            <p>Contacts:
                <Link to="#facebook-page"><i className="fab fa-facebook-square"></i></Link>
                <Link to="#instagram"><i className="fab fa-instagram"></i></Link>
                <Link to="mailto:contactus@justcookit.com"><i className="fas fa-envelope"></i></Link>
            </p>
            <p><i className="fas fa-map-marker-alt"></i> Sofia 1000, 84 Vitosha Str</p>
            <p><Link to="/about">About Just Cook It</Link></p>
        </div>
    );
}

export default Footer;