import { Analytics } from "../components/Analytics";

export const Home = () => {
    return (
        <>
            <main>
                {/* first section */}
                <section className="section-hero">
                    <div className="containers grid grid-two-cols">
                        <div className="hero-content">
                            <p>We are the worlds best IT company</p>
                            <h1>Welcome to Shubham Technicals</h1>
                            <p>
                                Are you ready to take your business to the next level with cutting-edge IT solutoins?
                                Look no further! At Shubham Technicals, we specialize in providing innovative IT services
                                and solutoins tailored to meet your unique needs.
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact"><button className="btn">connect now</button></a>
                                <a href="/service"><button className="btn secondary-button">learn more</button></a>
                            </div>
                        </div>

                        {/* hero images */}
                        <div className="hero-images">
                            <img src="/images/hero-img.png" alt="hero-img-1" width="500" height="500" />
                        </div>

                    </div>
                </section>

                {/* second section */}
                <Analytics/>

                {/* third section */}
                <section className="section-hero">
                    <div className="containers grid grid-two-cols">
                        {/* hero images */} 
                        <div className="hero-images">
                            <img src="/images/design.png" alt="design image" width="600" height="400" />
                        </div>
                        <div className="hero-content">
                            <p>We are here to help you</p>
                            <h1>Get Started Today</h1>
                            <p>
                                Ready to take the first step towards a more efficient and secure IT infrastructure? Contact 
                                us today for a free consultation and lets discuss how Shubham Technicals can help your business 
                                thrive in the digital age.
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact"><button className="btn">connect now</button></a>
                                <a href="/service"><button className="btn secondary-button">learn more</button></a>
                            </div>
                        </div>


                    </div>
                </section>

            </main>
        </>
    );
}