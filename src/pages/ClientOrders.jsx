import  React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { useSelector } from 'react-redux';
import Container from "@material-ui/core/Container";
// import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ImageBox from '../components/ImageBox'
import { format } from 'date-fns';
import Chip from '@mui/material/Chip';

import DataTable from '../components/DataTable';
import routes from '../routes';
import { ordersAdd } from '../reducers/ordersReducer';


const columns = [
  { field: 'orderDate', headerName: 'Дата Заказа', width: 150, renderCell: (params) => {
    return format(new Date(params.row.orderDate), 'dd.MM.yyyy,  hh:mm ')
  } },
  { field: 'usluga', headerName: 'Услуга', width: 250, renderCell: (params) => {
    return params.row.usluga.name;
  } },
  { field: 'sotrudnik', headerName: 'Сотрудник', width: 250, renderCell: (params) => {
    return params.row.sotrudnik.fio;
  } },
  { field: 'completeDate', headerName: 'Дата Завершения', width: 150, renderCell: (params) => {
    if (!params.row.completeDate) {
      return null;
    }
    return format(new Date(params.row.completeDate), 'dd.MM.yyyy,  hh:mm ')
  } },
  { 
    field: 'status',
    headerName: 'Статус',
    width: 150,  
    renderCell: (params) => {
      const mappingStatus = {
        CREATED: {
          style: {
            borderColor: '#039be5', 
            color: '#039be5'
          },
          text: 'Текущий'
        },
        COMPLETE: {
          style: {
            borderColor: '#c0ca33', 
            color: '#c0ca33'
          },
          text: 'Завершено'
        },
        ISSUED: {
          style: {
            borderColor: '#9575cd', 
            color: '#9575cd'
          },
          text: 'Выполнено'
        },
        CANCELED: {
          style: {
            borderColor: '#ef5350', 
            color: '#ef5350'
          },
          text: 'Отменено'
        },
        PAID: {
          style: {
            borderColor: '#4caf50', 
            color: '#4caf50'
          },
          text: 'Оплачено'
        }
      }
      const { status } = params.row;
      return <Chip label={mappingStatus[status].text}   style={mappingStatus[status].style} variant="outlined" size='small' />
    },
  },
  { field: 'number', headerName: 'Количество', },
  { field: 'totalPrice', headerName: 'Итоговая цена', width: 150 },
];

const ClientOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order);
  const { user } = useSelector(state => state.auth);
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(routes('getOrders')); 
        const filtered = response.data.filter(({ client }) => (client.id === user.id))   
        dispatch(ordersAdd(filtered));
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  return (
    <Container>
      <Typography variant='h5' sx={{mt: 5, mb:2}}>Мои заказы</Typography>
      <DataTable
        columns={columns}
        rows={orders}
        heightTable={'650px'}
      />
    </Container>
  )
}

export default ClientOrders;