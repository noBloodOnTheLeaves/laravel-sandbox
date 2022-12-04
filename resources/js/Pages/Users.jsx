import Table from "@/ui/Table/Table";
import {useEffect, useState} from "react";
import axios from "./../axios";
import ListSearchInput from "@/ui/ListSearchInput/ListSearchInput";
import {Grid, Tooltip} from "@mui/material";

const Users = () => {

    const columns = [
        {
            headerName: "ID",
            field: "id",
            sortable: true,
            width: 73,
            align: "center"
        },
        {
            headerName: "Имя",
            field: "name",
            align: "left",
            sortable: true
        },
        {
            headerName: "email",
            field: "email",
            align: "left",
            sortable: true
        },
    ];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableHeight, setTableHeight] = useState(window.innerHeight - 320);
    const [paginationPage, setPaginationPage] = useState(0);
    const [paginationTotal, setPaginationTotal] = useState(0);
    const [paginationPageSize, setPaginationPageSize] = useState(2);
    const [filter, setFilter] = useState({
        orderBy: null,
        direction: 'desc',
        search: null
    });

    const handleResize = () => {
        setTableHeight(window.innerHeight - 320);
    };

    const handlePageChange = (newPage) => {
        setPaginationPage(Number(newPage));
    };

    const handlePageSizeChange = (pageSize) => {
        setPaginationPage(0);
        setPaginationPageSize(Number(pageSize));
    };

    const handleTableSort = (column) => {
        setFilter({...filter, orderBy: column[0]['field'], direction: column[0]['sort']});
    };

    useEffect(() => {
        updateUsersList();
    }, [filter, paginationPage, paginationPageSize]);

    const onSearch = searchStr => {
        // Если поле поиска стёрли, выставим null вместо пустой строки, чтобы параметр search не улетал
        if (searchStr.length === 0) searchStr = null;
        setFilter({
            ...filter,
            search: searchStr
        })
    }


    async function updateUsersList() {
        setLoading(true);
        await axios.get('/users', {
            params: {
                // Компонент пагинации MaterialUI ведет отсчет страниц с 0, а Laravel Paginator с 1
                // Для корректной работы интерфейса в блоке пагинации приходится делать (+1)
                page: paginationPage + 1,
                pageSize: paginationPageSize,
                ...filter,
            }
        }).then((response) => {
            if (response.data.meta !== undefined) {
                setPaginationPage(response.data.meta.current_page - 1);
                setPaginationTotal(response.data.meta.total);
            }
            setData(response.data.data);

        }).catch((errors)=>{
            console.log(errors);
        });
        setLoading(false);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) }
    }, []);

    return (
        <>
            <Grid container justifyContent={"start"} alignContent={"center"} spacing={2}>
                <Grid item>
                    <Tooltip
                    arrow
                    interactive
                    title={'Поиск производится по полям: ID, Имя, Email'}
                    >
                        <ListSearchInput
                            onValueChange={onSearch}
                        />
                    </Tooltip>

                </Grid>
            </Grid>

            <Table
                columns={columns}
                rows={data}
                tableMaxHeight={tableHeight}
                onSortModelChange={handleTableSort}
                showTableHeader={true}
                showTableFooterPagination={true}
                paginationCurrentPage={paginationPage}
                paginationRowsPerPage={paginationPageSize}
                paginationRowsCount={paginationTotal}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
                loading={loading}
            />
        </>
    );
}

export default Users;
