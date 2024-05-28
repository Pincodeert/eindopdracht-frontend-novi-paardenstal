import React from "react";
import "./TableHead.css";

function TableHead({className ,children}) {
    return (
        <thead>
        <tr className={className}>
            {children}
        </tr>
        </thead>
    );
}

export default TableHead;