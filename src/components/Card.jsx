import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({card}) {
  const {
    title,
    img,
    price
  } = card;
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          от {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined' color='secondary'>Записаться</Button>
      </CardActions>
    </Card>
  );
}
