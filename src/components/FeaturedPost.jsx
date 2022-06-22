import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ImageBox from '../components/ImageBox';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import LandscapeIcon from '@mui/icons-material/Landscape';
import { Link } from 'react-router-dom';

function FeaturedPost(props) {
  const { post, portfolio = true } = props;

  return (
    <Grid item xs={12} md={6}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" >
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color='textSecondary' >
              {post.date}
            </Typography>
            <Stack direction="row" spacing={1} sx={{mt:2, mb: 2, flexWrap: 'wrap', rowGap: 1}}>
              <Chip icon={<FaceIcon />} label="Портрет" variant="outlined" size='small'/>
              <Chip icon={<FamilyRestroomIcon />} label="Семейные" variant="outlined" size='small'/>
              <Chip icon={<LandscapeIcon />} label="Пейзаж" variant="outlined" size='small'/>
            </Stack> 
            
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            {portfolio && <ImageBox cols={6}/>}
            {portfolio && <Link to='/portfolio'>
             <Typography variant="subtitle1" color="primary" >
              Посмотреть подробнее...
            </Typography>
            </Link>}
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
    </Grid>
  );
}


export default FeaturedPost;