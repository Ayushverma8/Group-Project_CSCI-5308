import { Fragment } from "react/cjs/react.production.min"

export default function Input(props) {
    return (
        <Fragment>
            <div className="form-outline mb-4">
                <input type={props.type} name={props.name} onChange={props.onChange} value={props.value} className="form-control" placeholder={props.placeholder} />
            </div>
            {props.errors && props.errors[props.name] && (<p className="form-err">{props.errors[props.name]}</p>)}
        </Fragment>
    )
}