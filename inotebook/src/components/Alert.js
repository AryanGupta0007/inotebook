import React from 'react'
export const Alert = (props) => {
    return (
        <div>
            <div className="alert alert-dark" role="alert">
                {props.msg}
            </div>
        </div>
    )
}