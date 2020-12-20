import React from 'react'
import './LoadingBox.scss'

export default function LoadingBox() {
    return (
        <div className="loadingBox__background">
            <i className="fa fa-gear fa-spin"></i>
        </div>
    )
}
