import { Fragment, useEffect } from "react";
import API_CLIENT from '../api/axiosClient'
import { useNavigate } from "react-router-dom";

function VerifyEmailMessgage() {
    const navigate = useNavigate();

    return (
        <Fragment>
            <link href="css/style_Login.css" rel="stylesheet" type="text/css" media="all"></link>
            <div className="w3-main mt-5" >
                <div className="about-bottom main-agile book-form">
                    <h2 className="tittle">Kindly verify your email before proceeding then press below button</h2>
                    <div>
                        <p className="forgot-password text-right">
                            <a className="btn btn-primary" href="/">Home</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer-w3l">
                <p>&copy; All rights reserved | Design by Password Vault</p>
            </div>
        </Fragment>
    )
}

export default VerifyEmailMessgage;