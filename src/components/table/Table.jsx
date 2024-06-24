import React from "react";
import styles from "./Table.module.css";

function Table({className, tableHeadClassName, tableHeadArray, children}) {

    return (
        <table className={styles[className]}>
            <thead>
            <tr className={styles[tableHeadClassName]}>
                {tableHeadArray.map((tableHead) => {
                    return <th className={styles["table-head-item"]}
                               key={tableHeadArray.indexOf(tableHead)}>
                        {tableHead}</th>
                })}
            </tr>
            </thead>
            {children}
        </table>
    );
}

export default Table;