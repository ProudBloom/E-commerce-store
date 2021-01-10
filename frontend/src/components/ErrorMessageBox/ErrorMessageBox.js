import React from 'react'
import './ErrorMessageBox.scss'

export default function ErrorMessageBox(props) {
    return (
        <div className="err-wrapper">
            <i className="fa fa-exclamation-circle err-icon"></i>
            <p className="err-heading">{props.err}</p>
            <a className="err-button" href="/"><i className="fa fa-arrow-left" aria-hidden="true"></i>Back to main site</a>
        </div>
    )
}
