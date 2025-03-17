import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {
    const {user} = useAuth();

    return (
        <>
            <section className="section-hero">
                <div className="containers grid grid-two-cols">
                    <div className="hero-content">
                        <p>Welcome, {user ? `${user.username} to our website` : ` to our website`}</p>

                        <h1>Why Choose Us?</h1>
                        <p>
                            Expertise: Our team consists of experienced IT professionals who are passionate about staying up-to-date with the latest industry trends
                        </p>
                        <p>
                            Customization: We understand that every business is unique. That's why we create solutions that are tailored to your specific needs and goals
                        </p>
                        <p>
                            Customer-Centric Approach. We prioritize your satisfaction and provide top-notch support to address your IT concerns.
                        </p>
                        <p>
                            Reliability: Count on us to be there when you need us. We're committed to ensuring your IT environment is reliable and available 24/7.
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn">connect now</button></a>
                            <a href="/service"><button className="btn secondary-button">learn more</button></a>
                        </div>
                    </div>

                    {/* hero images */}
                    <div className="hero-images">
                        <img src="/images/aboutus.png" alt="hero-img-1" width="500" height="500" />
                    </div>

                </div>
            </section>

            {/* second section */}
            <Analytics/>
        </>
    );
}