import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="NotFound">
            <div className="back-btn">
                <i onClick={() => navigate(-1)} className="fa fa-arrow-circle-left"></i>
            </div>

            <h1 className="title">Sorry, this page does not exist</h1>
            <img src="/no-food-kitten.jpg" alt="Sad Kitten" />
        </div>
    );
}

export default NotFound;