import React from "react";
import {CircularProgress} from "@mui/material";

export default function TableLoading (props) {
    return (
        <tr><td colSpan="1000" height={props.tableBodyHeight} style={{marginTop: '10%'}} align={'center'}>
            <div
                //className={props.class}
            >
                <CircularProgress size={30}/>
            </div>
        </td></tr>
    );
}
