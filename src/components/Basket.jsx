import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';

import Divider from '@mui/material/Divider';
import BasketServiceItem from './BasketServiceItem';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { clientsAdd } from '../reducers/clientsReducer';
import { closeDialog } from '../reducers/uiReducer';
import routes from '../routes';


export default function Basket(props) {
  const { client } = props;
  const navigate = useNavigate();
  const basket = useSelector(state => state.basket);
  const auth = useSelector(state => state.auth);
  const summary = basket.reduce((acc, item) => {
    acc.sumNumber += 1
    acc.sumPrice += (item.price * item.number)
    if (item.discountSize) {
      acc.sumPriceWithDiscount += ((1 - item.discountSize / 100) * item.price * item.number)
    }
    return acc;
  }, { sumPrice: 0, sumNumber: 0, sumPriceWithDiscount: 0})

  const { dialogs } = useSelector(state => state.ui);
  const dispatch = useDispatch();
 

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(routes('getClients'));    
        dispatch(clientsAdd(response.data))
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);

  const handleSubmit  = async (event) => {
    event.preventDefault(); 
    if (!auth.isAuth) {
      navigate('/login');
      return;
    }
    const [item] = basket;

    const order = {
      number: item?.number,
      id_sotr: 1,
      id_client: client.id,
      id_usligi: item.id
    }
    console.log(order);
    const url = routes('addOrder');
    try {
      const response = await axios.post(url, order);
      console.log(response.data);
      alert('Заказ оформлен')
    } catch (e) {
      alert(e);
    }
   
  };



  const handleClose = () => {
    dispatch(closeDialog('basket'))
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
    >
      <Container
        component="form"
        
        noValidate
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '93vh',
            mt: 2
        }}
        >
          <Typography
              variant='h6'
              sx={{ color: 'grey'}}
            >
            Корзина заказов
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              columnGap: 2,
              mt: 2,  
            }}
          > 
          <List sx={{width: '100%'}}>
            { basket.length === 0 ? 
              (<Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: '80%',
                  alignItems: 'center',
                }}
              >
                <LocalGroceryStoreOutlinedIcon fontSize='large' color='disabled'/>
                <Typography variant='h6' sx= {{ color: '#e0e0e0', }}>Ваша корзина пуста</Typography>
              </Box>):
              basket.map((item) => {
                return (
                  <BasketServiceItem key={item?.id} item={item} />
                )
              })
            } 
          </List>
          </Box>
          
          {basket.length != 0 && <Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <Typography variant='body2'><b>Итого сумма</b></Typography>
              <Typography variant='subtitle2'>{ summary.sumPriceWithDiscount === 0 ? `${summary.sumPrice} р.` : <><strike style={{color: 'red'}}>{summary.sumPrice}</strike> { summary.sumPriceWithDiscount}</>  }</Typography>
            </Box>
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1
              }}
            >
              <Typography variant='body2'><b>Наименований</b></Typography>
              <Typography variant='subtitle2'>{`${summary.sumNumber} `}.</Typography>
            </Box>
          </Box>}
        </Box>
        {basket.length != 0 && <Button fullWidth variant='contained' onClick={handleSubmit} >Оформить</Button>}
      </Container>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <SwipeableDrawer
              anchor={anchor}
              open={dialogs.basket}
              onClose={handleClose} 
            >
              {list(anchor)}
            </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
