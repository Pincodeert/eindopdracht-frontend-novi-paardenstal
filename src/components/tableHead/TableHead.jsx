import React from "react";
import "./TableHead.css";

// function TableHead({className, list}) {
//
//     return (
//         <thead>
//         <tr  className={className}>
//             {list.map((listItem) => {
//
//              return   <th key={listItem}>{listItem}</th>
//
//             })}
//         </tr>
//
//         </thead>
// );
// }

function TableHead({className, children}) {

    return (
        <thead>
        <tr  className={className}>
            {children}
        </tr>

        </thead>
    );
}

export default TableHead;