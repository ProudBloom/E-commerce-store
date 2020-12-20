import React from 'react'
import './ErrorMessageBox.scss'

export default function ErrorMessageBox(props) {
    return (
        <div className="error__background">
            <i className="fa fa-exclamation-circle"></i>
            <p className="error__pragraph">{props.err}</p>
        </div>
    )
}
