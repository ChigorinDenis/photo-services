import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
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
import { selectEmployee } from '../reducers/uiReducer'
import { host } from '../routes';
import { Box } from '@material-ui/core';

function FeaturedPost(props) {
  const { post, portfolio = true } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch()
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

            {portfolio &&<Box sx={{ display: 'flex', gap: 5}}>
              <Button
                variant='outlined'
                color="secondary"
                onClick={() => {
                  dispatch(selectEmployee(post));
                  navigate('/portfolio')
                }}
              >
                Портфолио
              </Button>
              <Button
                variant='contained'
                color="primary"
                sx={{ color: 'white' }}
                onClick={() => {
                  dispatch(selectEmployee(post));
                }}
              >
                Выбрать
              </Button>
            </Box>}
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={`${host}${post.avatarImagePath}`}
            alt={post.imageLabel}
          />
        </Card>
    </Grid>
  );
}


export default FeaturedPost;