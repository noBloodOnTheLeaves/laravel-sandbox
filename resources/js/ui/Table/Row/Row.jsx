import React from "react";
import {TableCell, TableRow} from "@mui/material";

export default function Row (props) {
    const {row, columns, showTableHeader, setCellWidth, hover, handleRowClick} = props;
    const handleRowClickIsAssigned = handleRowClick !== undefined && typeof handleRowClick === "function";

    return <TableRow
        hover={hover}
        style={handleRowClickIsAssigned ? {cursor:'pointer'} : null}
        onClick={(event) => {
            if (handleRowClickIsAssigned) {
                handleRowClick(event, row)
            }
        }}
    >
        {columns.map((column, i) => {
            const cellContent = row[column['field']] ?? '';

            return <TableCell
                align={(column.align !== undefined) ? column.align : 'left'}
                key={'tr-cell-'+i}
                style={(showTableHeader === false) ? setCellWidth(column.width) : null}
            >
                { column.renderCell ? column.renderCell({'row': row }) : cellContent }
            </TableCell>
        })}
    </TableRow>
}
