import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";


const PostsCard = ({card, title, content}) => {
    const truncate = (str, n) => {
        return (str.length > n) ? str.slice(0, n-1) + ' ...' : str;
    };
    return (
        <Grid item key={card} xs={12} sm={6} md={6}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography>
                        {truncate(content,25)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default PostsCard;
