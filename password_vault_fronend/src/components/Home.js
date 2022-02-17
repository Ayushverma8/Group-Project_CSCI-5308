import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";
import { Link } from 'react-router-dom'
import SignUp from "./SignUp";

function Home() {
    const [test, setTest] = useState();

    useEffect(async () => {
        let res = await API_CLIENT.get('test/');
        setTest(res.data)
    }, [])

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-primary1  text-uppercase fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="#page-top">Password Vault</a>
                    <button className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="#portfolio">Home</a></li>
                            <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="#about">Pricing</a></li>
                            <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="#contact">Contact</a></li>
                            <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="#contact">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav><header className="masthead d-flex align-items-center">
                <div className="container px-4 px-lg-5 text-center">
                    <h1 className="mb-1">Password Managememnt from Anywhere</h1>
                    <h2 className="mb-5"><em>Life is happening online. Work. Play. Family and friends. Password Vault puts your digital life at your fingertips, simply and securely.</em></h2>
                    <a className="btn btn-primary btn-xl" href="#about">Find Out More</a>
                </div>
            </header>
            <section className="content-section bg-primary text-white text-center services" id="services">
                <div className="container px-4 px-lg-5">
                    <div className="content-section-heading">
                        <h2 className="mb-5">Why Use Password Vault</h2>
                    </div>
                    <div className="row gx-4 gx-lg-5">
                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                            <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-screen-smartphone"></i></span>
                            <h4><strong>Powerful Security</strong></h4>
                            <p className="text-faded mb-0">We provide the best security through encryption!</p>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                            <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-pencil"></i></span>
                            <h4><strong>Easiest To Manage</strong></h4>
                            <p className="text-faded mb-0">Easy to manage passwords through us!</p>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
                            <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-like"></i></span>
                            <h4><strong>Most Secure</strong></h4>
                            <p className="text-faded mb-0">
                                We provide the best security!
                                <i ></i>
                                
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <span className="service-icon rounded-circle mx-auto mb-3"><i className="icon-mustache"></i></span>
                            <h4><strong>Saves Money </strong></h4>
                            <p className="text-faded mb-0">We charge less comparitively!</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer text-center">
                <div className="container px-4 px-lg-5">
                    <div class="col-lg-3 col-md-6 mb-5 mb-md-0">
                    </div>
                    <p className="text muted small mb-0 contact-us"> Contact Us: info@passwordvault.com</p><n />
                    <p className="text-muted small mb-0">Copyright &copy; Password Vault 2022</p>
                </div>
            </footer><a className="scroll-to-top rounded" href="#page-top"><i className="fas fa-angle-up"></i></a></>


    )
}

export default Home;