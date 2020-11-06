import React from 'react';
import './styles.css'

export default function Field(props) {
    const { title, description } = props

    return(
        <div className="field">
            <label>{title}</label>
            <div className="box">
                <span>{description}</span>
            </div>
        </div>
    )
}