import React from 'react'
import './ErrorMessageBox.scss'

export default function ErrorMessageBox(props) {
    return (
        <div className="err-wrapper">
            <i className="fa fa-exclamation-circle err-icon"></i>
            { props.err 
                ? (<p className="err-heading">{props.err}</p>) 
                : (<p className="err-heading">Unknown error</p>) 
            }
            <a className="err-button" href="/"><i className="fa fa-arrow-left" aria-hidden="true"></i>Back to main site</a>
        </div>
    )
}
