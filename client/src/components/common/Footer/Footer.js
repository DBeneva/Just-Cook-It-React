import './Footer.scss';

function Footer() {
    return (
        <div className="Footer">
            <p>Contacts:
                <a href="#facebook-page"><i className="fab fa-facebook-square"></i></a>
                <a href="#instagram"><i className="fab fa-instagram"></i></a>
                <a href="mailto:contactus@justcookit.com"><i className="fas fa-envelope"></i></a>
            </p>
            <p><i className="fas fa-map-marker-alt"></i> Sofia 1000, 84 Vitosha Str</p>
            <p><a href="/about">About Just Cook It</a></p>
        </div>
    );
}

export default Footer;