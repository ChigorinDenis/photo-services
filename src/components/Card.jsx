import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { basketItemAdd } from '../reducers/basketReducer';
import { selectService } from '../reducers/uiReducer';
import Chip from '@mui/material/Chip';

export default function MediaCard({ card, discount, isAction = true }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {
    name,
    file,
    price,
    type
  } = card;
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={file}
        alt="text"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          от {price} р.
        </Typography>
        {discount && <Chip label={`- ${discount.size} %`} color="error" />}
      </CardContent>
      {isAction && <CardActions>
        { type === 'Фото' ?
          <Button
            size="small"
            variant='outlined'
            color='error'
            onClick={() => {
              dispatch(selectService(card))
              navigate('photosession')
            }}
          >
            Записаться
          </Button> :
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
        }
        
      </CardActions>}
    </Card>
  );
}
