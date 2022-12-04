import React, { useState } from "react";
import {Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';

/*const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});*/

export default function RowWithCollapse (props) {
    const {
        row,
        columns,
        showTableHeader,
        expandedColumnWidth,
        setCellWidth
    } = props;
    const [open, setOpen] = useState(false);
    //const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow
                //className={classes.root}
            >
                <TableCell
                    align={'left'}
                    style={(showTableHeader === false) ? setCellWidth(expandedColumnWidth) : null}
                >
                    {row.collapsedContent
                        ? <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                          </IconButton>
                        : ''}
                </TableCell>
                {columns.map((column, i) => {
                    const cellContent = row[column['field']] ?? '';

                    return <TableCell
                        align={column.align ?? 'left'}
                        key={'tr-cell-'+i}
                        style={(showTableHeader === false) ? setCellWidth(column.width) : null}
                    >
                        { column.renderCell ? column.renderCell({'row': row }) : cellContent }
                    </TableCell>
                })}
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={100}>
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        style={{boxShadow:'inset -3px 0px 8px 0px rgb(0 0 0 / 13%)'}}
                    >
                        {row.collapsedContent ?? null}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
