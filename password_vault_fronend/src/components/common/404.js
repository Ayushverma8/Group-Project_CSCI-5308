import { Fragment } from "react/cjs/react.production.min";

function PageNotFound() {
    return (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center" id="main" style={{ transform: "translate(0, 300%)" }}>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
                <div className="inline-block align-middle">
                    <h2 className="font-weight-normal lead" id="desc">The page you requested was not found.</h2>
                </div>
            </div>
            <div>
                <a className="btn btn-primary" href="/">Go back to Home</a>
            </div>
        </Fragment>
    )
}

export default PageNotFound;