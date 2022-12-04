import React, {useState} from 'react';
import TableLoading from "./Loading/TableLoading";
import Row from "./Row/Row";
import RowWithCollapse from "./RowWithCollapse/RowWithCollapse";
import {
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from "@mui/material";
import MuiTable from '@mui/material/Table';

/**
 * columns - названия столбцов
 * -- headerName - Название поля для пользователя
 * -- field - название поля (напр. 'name')
 * -- width - ширина колонки
 * -- align (left|center|right) по-умолчанию, 'left'
 * -- sortable (true|false) добавить кнопку сортировки по этому полю (сортировка серверная)
 * -- renderCell() выполнить кастомную ф-ю и вернуть результат, который попадет в ячейку
 * rows - массив данных для заполнения таблицы строками
 * tableMaxHeight - Максимальная высота таблицы
 * tableMinHeight - Минимальная высота таблицы. Актуально, если используете динамическую высоту в зависимости от высоты окна браузера, чтобы при малом окне не схлопнуло данные
 * tableHeight - высота таблицы (default: 450)
 * tableWidth - ширина таблицы (default: '100%')
 * onSortModelChange   - при клике по значку сортировки (от меньшего к большему и наоборот) будет запущена эта функция родителя
 * rowsPerPageOptions  - Варианты сколько строк отображать на странице (напр. [25, 50, 100] (default: [25, 50, { value: -1, label: 'Все' }])
 * showTableHeader     - показывать заголовки таблицы?
 * showTableFooterPagination - показать пагинацию в подвале таблицы?
 * paginationCurrentPage - Текущая страница (важно! первая страница = 0 (так задано в компоненте))
 * paginationRowsPerPage - Строк на странице
 * paginationRowsCount - Сколько всего записей
 * onPageChange        - Сколько всего записей
 * emptyListText       - Когда список пуст, какое вывести сообщение под картинкой
 * loading             - Если данные запрашиваются (не готовы), передайте true, а когда будут готовы false. Это добавит анимацию загрузки
 * haveRowCollapse     - Раскрывать строку при нажатии на нее (требует поле collapsedRow с jsx компонентом в элементах массива rows'
 * expandedColumnWidth - ширина столбца с иконкой раскрытия коллапса
 * hover               - передаем признак - должны ли строки подсвечиваться при наведении
 * handleRowClick      - обработчик клика на строку, возвращает событие клика (для остановки) и данные всей строки
 * defaultSortField    - поле, по которому происходит первоначальная сортировка, необязательное свойство
 */

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Table(props) {
    //const classes = useStyles();
    const columns = props.columns;
    const rows = props.rows;
    const haveRowCollapse = props.haveRowCollapse ?? false;
    const sortingOrder = props.sortingOrder !== undefined ? props.sortingOrder : ['desc', 'asc'];
    const rowsPerPageOptions = props.rowsPerPageOptions !== undefined ? props.rowsPerPageOptions : [25, 50, {
        value: -1,
        label: 'Все'
    }];
    const tableWidth = props.tableWidth !== undefined ? props.tableWidth : '100%';
    const showTableHeader = props.showTableHeader !== undefined ? props.showTableHeader : true;
    const showTableFooterPagination = props.showTableFooterPagination !== undefined ? props.showTableFooterPagination : false;
    // Выставлено 254 по-умолчанию, что примерно равно 3-4 строкам. Так сделано, потому что, если сделать экран не высоким, то данные схлопнутся
    let tableMinHeight = props.tableMinHeight !== undefined ? props.tableMinHeight : 254;
    if (rows.length < 4) tableMinHeight = null; // В ситуациях же, где данных меньше, чем 4 строки, уберём высоту таблицы, т.к. иначе будет страшно
    const tableMaxHeight = props.tableMaxHeight !== undefined ? props.tableMaxHeight : null;
    const tableHeight = props.tableHeight !== undefined ? props.tableHeight : null;
    const tableBodyHeight = tableHeight - 36 - 52; // это отнимаются высота хэдера и футера (если потом нужен будет авторасчет, сделаем)
    const paginationCurrentPage = props.paginationCurrentPage !== undefined ? props.paginationCurrentPage : 0;
    const paginationRowsPerPage = props.paginationRowsPerPage !== undefined ? props.paginationRowsPerPage : 25;
    const paginationRowsCount = props.paginationRowsCount !== undefined ? props.paginationRowsCount : -1;
    const emptyListText = props.emptyListText !== undefined ? props.emptyListText : 'Нет записей';
    const loading = props.loading;
    const expandedColumnWidth = props.expandedColumnWidth ?? 20;

    const [orderByDirection, setOrderByDirection] = useState(sortingOrder[0]);
    const [orderByField, setOrderByField] = useState(props.defaultSortField ?? null);
    const hover = props.hover !== undefined ? props.hover : true;
    const handleRowClick = props.handleRowClick

    /**
     * @param field Название поля (например, 'name')
     */
    function handleTableSort(field) {
        // Не нужна работа сортировки, если записей нет
        if (rows.length > 0) {
            let localDirection;
            // Название поля, по которому происходит сортировка хранится в state.
            // Если была запущена сортировка по полю, отличному от того, что в state,
            // то направление сортировки выставим в дефолтное, а не просто переключим
            // на другое. Если же сортируют по тому же полю, значит просто переключим
            if (orderByField !== field) {
                localDirection = sortingOrder[0]
            } else {
                localDirection = (orderByDirection === 'desc') ? 'asc' : 'desc'
            }
            // Новые значения сохраним в state
            setOrderByDirection(localDirection);
            setOrderByField(field);
            // Запустим перерисовку списка на родителе
            props.onSortModelChange([{field: field, sort: localDirection}])
        }
    }

    return (
        <TableContainer style={
            {
                height: tableHeight,
                maxHeight: tableMaxHeight,
                minHeight: tableMinHeight,
                width: tableWidth,
                overflow: 'auto'
            }
        }>
            <MuiTable
                //className={classes.table}
                aria-label="Таблица с данными"
            >

                {/* Заголовок таблицы */}
                {/* 1. Ширину колонок будем назначать только в th, т.к. в tbody колонки подчинятся ширине в th */}
                {/* Если заголовки отключат пропсом showTableHeader, тогда придется назначить ширину каждой    */}
                {/* ячейке в body. Достаточно только верхней, но это заморочки. Код и так сложный.             */}
                {(showTableHeader === true) ?
                    <TableHead>
                        <TableRow>
                            {haveRowCollapse
                                ? <TableCell
                                    style={setCellWidth(expandedColumnWidth)}
                                    //className={classes.asuTableTheadCell}
                                />
                                : null
                            }
                            {columns.map((column, i) => {
                                let sortLabel = (column.sortable !== undefined && column.sortable === true)
                                    ? (<TableSortLabel
                                        active={orderByField === column.field}
                                        direction={orderByDirection}
                                        //classes={{icon: (orderByField === column.field) ? classes.activeSortIcon : classes.inactiveSortIcon }}
                                        //IconComponent={<PlayArrow/>}
                                        onClick={() => {
                                            handleTableSort(column.field)
                                        }}
                                    />)
                                    : null;
                                return (
                                    <TableCell
                                        //className={classes.asuTableTheadCell}
                                        variant="head"
                                        // Выравнивание будем назначать одинаковое и для заголовка и для контента
                                        align={(column.align !== undefined) ? column.align : 'left'}
                                        key={'th-cell-' + i}
                                        style={setCellWidth(column.width)}>
                                        {/* Если выравнивание колонки по правому краю, иконку сортировки отобразим слева, чтобы не создать страшный отступ */}
                                        {(column.align === 'right') ? sortLabel : null}
                                        {column.headerName}
                                        {(column.align !== 'right') ? sortLabel : null}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    : null}

                {/* Тело таблицы */}
                <TableBody>
                    {loading
                        ? <TableLoading
                            tableBodyHeight={tableBodyHeight}
                            //class={classes.emptyListContainer}
                        />
                        :
                        (rows.length > 0)
                            ?
                            rows.map((row, idx) => {
                                return haveRowCollapse
                                    ? <RowWithCollapse
                                        key={idx + 'row' + row.id}
                                        row={row}
                                        columns={columns}
                                        setCellWidth={setCellWidth}
                                        showTableHeader={showTableHeader}
                                        expandedColumnWidth={expandedColumnWidth}
                                    />
                                    : <Row
                                        key={idx + 'row' + row.id}
                                        row={row}
                                        columns={columns}
                                        setCellWidth={setCellWidth}
                                        hover={hover}
                                        handleRowClick={handleRowClick}
                                    />
                            })
                            : <tr>
                                <td colSpan="1000" height={tableBodyHeight} align={'center'}>
                                    <div
                                        //className={classes.emptyListContainer}
                                        >
                                        {getEmptyListSvgIcon()}
                                        {emptyListText.length > 0 ? <span>{emptyListText}</span> : null}
                                    </div>
                                </td>
                            </tr>
                    }
                </TableBody>

                {/* "Подвал" таблицы */}
                <TableFooter>
                    <TableRow>
                        {showTableFooterPagination ?
                            <TablePagination
                                //className={classes.asuTableTfootCell}
                                rowsPerPageOptions={rowsPerPageOptions}
                                page={paginationCurrentPage}
                                rowsPerPage={paginationRowsPerPage}
                                count={paginationRowsCount}
                                SelectProps={{
                                    native: true
                                }}
                                labelDisplayedRows={({ from, to, count })=>{
                                    return from + '-' + (to !== -1 ? to : rows.length) + ' из ' +  (count !== -1 ? count : rows.length)
                                }}
                                onPageChange={(e, page) => props.onPageChange(page)}
                                onRowsPerPageChange={(e) => props.onRowsPerPageChange(e.target.value)}
                            /> : null}
                    </TableRow>
                </TableFooter>
            </MuiTable>
        </TableContainer>
    );
}

function setCellWidth(width, measure = 'px') {
    if (width !== undefined && !isNaN(width)) {
        return {'width': width + measure}
    } else {
        return null
    }
}

function getEmptyListSvgIcon() {
    return (
        <svg width="105" height="94" viewBox="0 0 184 152" aria-hidden="true" focusable="false">
            <g fill="none" fillRule="evenodd">
                <g transform="translate(24 31.67)">
                    <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668"/>
                    <path className="ant-empty-img-1" d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"/>
                    <path className="ant-empty-img-2" d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"/>
                    <path className="ant-empty-img-3" d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"/>
                </g>
                <path className="ant-empty-img-3" d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"/>
                <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                    <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"/>
                    <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"/>
                </g>
            </g>
        </svg>
    )
}

/*const useStyles = makeStyles((theme) => {
    return {
        activeSortIcon: {
            opacity: 1,
            color: '#20a0ff !important'
        },
        inactiveSortIcon: {
            opacity: 0.6,
            color: '#65b8ff',
        },
        asuTableTheadCell: {
            position: 'sticky',
            top: 0,
            background: theme.overrides.MuiTableHead.root.background,
            borderBottom: theme.overrides.MuiTableCell.head.borderBottom,
            zIndex: 7
        },
        asuTableTfootCell: {
            position: 'sticky',
            bottom: 0,
            background: theme.overrides.MuiTableFooter.root.background,
            borderBottom: theme.overrides.MuiTableFooter.root.background
        },
        emptyListContainer: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '65px 0',
            '& .ant-empty-img-1': {
                fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
            },
            '& .ant-empty-img-2': {
                fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
            },
            '& .ant-empty-img-3': {
                fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
            },
            '& .ant-empty-img-4': {
                fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
            },
            '& .ant-empty-img-5': {
                fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
                fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
            },
        },
        loading: {
            width: '100%',
            height: '100%',
            background: "white",
        },
    }
});*/

// Может быть когда-то пригодится
//
// AsuTable.propTypes = {
//     columns: PropTypes.array.isRequired,
//     rows: PropTypes.array.isRequired,
//     tableMaxHeight: PropTypes.number,
//     tableMinHeight: PropTypes.number,
//     tableHeight: PropTypes.number,
//     tableWidth: PropTypes.string,
//     onSortModelChange: PropTypes.func,
//     rowsPerPageOptions: PropTypes.array,
//     showTableHeader: PropTypes.bool,
//     showTableFooterPagination: PropTypes.bool,
//     paginationCurrentPage: PropTypes.number,
//     paginationRowsPerPage: PropTypes.number,
//     paginationRowsCount: PropTypes.number,
//     onPageChange: PropTypes.func,
//     onRowsPerPageChange: PropTypes.func,
//     emptyListText: PropTypes.string,
//     loading: PropTypes.bool,
// }
