import React from 'react'
import './Error.scss'

export default function ErrorComponent() {
    return (
        <div className="err-wrapper">
            <h1 className="err-heading">Error. Product not found.</h1>
            <a className="err-button" href="/"><i className="fa fa-arrow-left" aria-hidden="true"></i>Back to main site</a>
        </div>
    )
}
