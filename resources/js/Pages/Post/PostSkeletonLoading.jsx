import {Box, Grid, Skeleton} from "@mui/material";


const PostSkeletonLoading = () =>{
    return (
        <Grid container spacing={4} alignContent={'center'}>
            <Grid item  xs={12} sm={6} md={6}>
                    <Skeleton variant="rectangular"  height={'200px'} />
                    <Box>
                        <Skeleton />
                        <Skeleton width="70%" />
                    </Box>
            </Grid>
            <Grid item  xs={12} sm={6} md={6}>
                <Skeleton variant="rectangular"  height={'200px'} />
                <Box>
                    <Skeleton />
                    <Skeleton width="70%" />
                </Box>
            </Grid>
            <Grid item  xs={12} sm={6} md={6}>
                <Skeleton variant="rectangular"  height={'200px'} />
                <Box>
                    <Skeleton />
                    <Skeleton width="70%" />
                </Box>
            </Grid>
            <Grid item  xs={12} sm={6} md={6}>
                <Skeleton variant="rectangular"  height={'200px'} />
                <Box>
                    <Skeleton />
                    <Skeleton width="70%" />
                </Box>
            </Grid>
            <Grid item  xs={12} sm={6} md={6}>
                <Skeleton variant="rectangular"  height={'200px'} />
                <Box>
                    <Skeleton />
                    <Skeleton width="70%" />
                </Box>
            </Grid>
            <Grid item  xs={12} sm={6} md={6}>
                <Skeleton variant="rectangular"  height={'200px'} />
                <Box>
                    <Skeleton />
                    <Skeleton width="70%" />
                </Box>
            </Grid>
        </Grid>
    );
}

export default PostSkeletonLoading;
