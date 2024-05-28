import React from "react";
import "./Display.css"

function Display({className ,title, children}) {
    return (
        <article className={className}>
            <div className="content-title">
                <h4>{title}</h4>
            </div>
            <div className="overwiew-container">
                {children}
            </div>
        </article>
    );
}

export default Display;