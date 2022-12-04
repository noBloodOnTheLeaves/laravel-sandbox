import {Container, Grid, Pagination, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "@/axios";
import PostCard from "@/Pages/Post/PostCard";
import PostSkeletonLoading from "@/Pages/Post/PostSkeletonLoading";


const Posts = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [paginationPage, setPaginationPage] = useState(1);
    const [paginationTotal, setPaginationTotal] = useState(0);
    const [paginationPageSize, setPaginationPageSize] = useState(6);

    useEffect( () =>{
        getPostsList();
    },[paginationPage]);

    async function getPostsList(){
        setLoading(true);
        await axios.get('/posts',{
            params: {
                page: paginationPage,
                pageSize: paginationPageSize,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.meta !== undefined) {
                setPaginationPage(response.data.meta.pagination.page);
                setPaginationTotal(response.data.meta.pagination.pages);
            }
            setPosts(response.data.data);
        }).catch((errors)=>{
            console.log(errors);
        });
        setLoading(false);
    }

    const handlePageChange = (event, value) => {
        setPaginationPage(Number(value));
    };

    const handlePageSizeChange = (pageSize) => {
        setPaginationPage(0);
        setPaginationPageSize(Number(pageSize));
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4} alignContent={'center'} justifyContent={'center'}>
                {
                    loading ? <PostSkeletonLoading/> :
                        posts.map((post)=>{
                            return (
                                <PostCard
                                    card={post.id}
                                    title={post.title}
                                    content={post.body}
                                />
                            );
                        })
                }
                <Grid item>
                    <Stack spacing={2} alignContent={'center'}>
                        <Pagination count={paginationTotal} variant="outlined" color="secondary" onChange={handlePageChange}/>
                    </Stack>
                </Grid>
            </Grid>

        </Container>
    );
}

export default Posts;
