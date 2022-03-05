import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";

function ForgetPassword() {
    const [test, setTest] = useState();

    useEffect(async () => {
        let res = await API_CLIENT.get('test/');
        setTest(res.data)
    }, [])

    return (<>
        <div className="header">
            <h1>  </h1>
        </div>
        <div className="w3-main">
            <div className="about-bottom main-agile book-form">
                <div className="alert-close"> </div>
                <h2 className="tittle">Forget Password</h2>
                <form action="#" method="post">
                    <div className="form-date-w3-agileits">
                        <label> Email </label>
                        <input type="email" name="email" placeholder="Your Email" required="" />
                    </div>
                    <div className="make wow shake">
                        <input type="submit" value="Submit" />

                    </div>
                    <div>
                    </div>
                </form>
            </div>
        </div>
        <div className="footer-w3l">
            <p>&copy; All rights reserved | Design by Password Vault</p>
        </div>
    </>
    )
}

export default ForgetPassword;