import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { basketItemAdd } from '../reducers/basketReducer';
import Chip from '@material-ui/core/Chip';

export default function MediaCard({ card, discount }) {
  const dispatch = useDispatch()
  const {
    name,
    file,
    price
  } = card;
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={file}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          от {price} р.
        </Typography>
        {discount && <Chip label={`- ${discount.size} %`} color="secondary" />}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant='outlined'
          color='secondary'
          onClick={() => {
            const basketItem = {
              ...card,
              number: 1,
              discountSize: discount?.size
            }
            dispatch(basketItemAdd(basketItem));
          }}
        >
          Добавить
        </Button>
      </CardActions>
    </Card>
  );
}
