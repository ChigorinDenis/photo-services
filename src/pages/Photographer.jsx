import React, { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Avatar from '@mui/material/Avatar';
import { employeesAdd } from '../reducers/employeeReducer';
import routes from '../routes';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import UpdateStatus from '../layouts/UpdateStatus'
import { Chip } from '@material-ui/core';
import { ordersAdd } from '../reducers/ordersReducer';
import { openDialog } from '../reducers/uiReducer';
import { sendData } from '../reducers/uiReducer';
import format from 'date-fns/format';
import Container from "@material-ui/core/Container";
import EmailIcon from '@mui/icons-material/Email';
import FeaturedPost from "../components/FeaturedPost";
import OrdersLayout from "../layouts/OrdersLayout";
import { Typography } from "@mui/material";

const post = [
  {
    title: 'Фотограф Михаил',
    date: 'Вдохновляют улыбки людей',
    description:
      `Работаю фотографом уже более 5 лет. Профессионально подхожу к делу, ищу компромиссы в цветопередаче. 
      Пусть ваши воспоминания будут запечатлены.`,
    image: '/img/photographer1.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Фотограф ',
    date: 'Люблю торжественные и яркие дни',
    description:
      'Если вас заитересовало мое творчество, то смелее записывайтесь ко мне на фотоссесии.',
      image: '/img/photographer2.avif',
    imageLabel: 'Image Text',
  },
];

const handleOnEmail = (row) => () => {
  const { client, sotrudnik, usluga, orderDate } = row;
  const data = {
      email: client?.email,
      title: "Уведомление фотосалона",
      text: `Здравствуйте, ${client?.fio}!
      Ваши фотографии по заказу оформленному ${format(new Date(orderDate), 'dd.MM.yyyy')}г. по услуге "${usluga?.name}" готовы.\n
      Фотограф - ${sotrudnik?.fio}
      Дата ${format(new Date(), 'dd.MM.yyyy HH:mm')}`
  }
  
  try {
    const response = axios.post('http://localhost:8080/sotrudnik/send-email', data);
    alert('Письмо отправлено');
  }
  catch(err) {
    console.log(err)
  }

}

const columns = [
  { field: 'orderDate', headerName: 'Дата Заказа', width: 150, renderCell: (params) => {
    return <>
    {format(new Date(params.row.orderDate), 'dd.MM.yyyy ')}
    <br />
    {format(new Date(params.row.orderDate),  'hh:mm ')}
    </>
  } },
  { field: 'client', headerName: 'Клиент', width: 150, renderCell: (params) => {
    const { fio, phone } = params.row.client;
    return (
      <Box
        sx={{display: 'flex', flexDirection: 'column'}}
      >
        <span>{fio}</span>
        <i>{phone}</i>
      </Box>
    )
  } },
  { field: 'usluga', headerName: 'Услуга', width: 150, renderCell: (params) => {
    return params.row.usluga.name;
  } },
  { field: 'number', headerName: 'Количество', },
  { field: 'totalPrice', headerName: 'Цена', width: 150 },
  { field: 'issueDate', headerName: 'Дата выполнения', width: 150, renderCell: (params) => {
    if (!params.row.issueDate) {
      return null;
    }
    return <>
      {format(new Date(params.row.issueDate), 'dd.MM.yyyy ')}
      <br />
      {format(new Date(params.row.issueDate),  'hh:mm ')}
      </>
  } },
  { field: 'completeDate', headerName: 'Дата Завершения', width: 150, renderCell: (params) => {
    if (!params.row.completeDate) {
      return null;
    }
    return <>
      {format(new Date(params.row.completeDate), 'dd.MM.yyyy ')}
      <br />
      {format(new Date(params.row.completeDate),  'hh:mm ')}
      </>
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
          text: 'Создано'
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
        }
      }
      const { status } = params.row;
      return <Chip label={mappingStatus[status].text}   style={mappingStatus[status].style} variant="outlined" size='small' />
    },
  },
  { headerName: '', width: 300 ,renderCell: (params) => {
    return <Button color='primary' variant='contained' startIcon={<EmailIcon />} onClick={handleOnEmail(params.row)} size='small' sx={{ color: 'white'}}>Оповещение</Button>
  } },
];

const PhotographerPage = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [sotrudnik, setSotrudnik] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSotr = await axios.get(`http://localhost:8080/admin/sotrudnik/by-username/${user?.username}`);
        setSotrudnik(responseSotr.data);
        const response = await axios.get(routes('getOrders')); 
        const filtered = response.data.filter((f) => (f.sotrudnik.id === responseSotr.data.id))  
        dispatch(ordersAdd(filtered))
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  
  return (
    <Container>
      <Box sx={{ mt: 5, mb: 2}}>
        <FeaturedPost  post={{...sotrudnik, ...post[0]}} portfolio={false}/>
      </Box>
      <Typography variant="h6" sx={{ mb: 2}}>Мои заказы</Typography>
      <DataTable
        columns={columns}
        rows={orders || []}
        onRowDoubleClick={(params) => {
          dispatch(openDialog('status'))
          dispatch(sendData({id: params.row.id }))
        }}
      />
      <UpdateStatus />
    </Container>
    
  )
};

export default PhotographerPage;
