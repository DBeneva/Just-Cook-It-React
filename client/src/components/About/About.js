import './About.scss';

function About() {
    return (
        <div className="About">
            <div className="back-btn"><i className="fa fa-arrow-circle-left"></i></div >
            <div>
                <h1 className="title">About Just Cook It</h1>
                <p>
                    We are an open community for people who love cooking. You are more than welcome to join us and make our space even more delicious with your own recipes.
                </p>
                <p>
                    Meat or vegetables, traditional or borderline crazy, all recipes are welcome and will not be judged! All ways to prepare the same meal as well. We appreciate every single member of our community and can't wait to hear from you!
                </p>
                <p>
                    We would be very grateful for any constructive feedback about the platform, as we keep working on it and striving to make it better every time.
                </p>
            </div>
        </div>
    );
}

export default About;

{/* <div class="back-btn"><i (click)="back()" class="fa fa-arrow-circle-left"></i></div > */}