import React, { useEffect } from 'react';
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
import { Chip } from '@material-ui/core';
import { ordersAdd } from '../reducers/ordersReducer';
import format from 'date-fns/format';



const columns = [
  { field: 'orderDate', headerName: 'Дата Заказа', width: 150, renderCell: (params) => {
    return format(new Date(params.row.orderDate), 'dd.MM.yyyy,  hh:mm ')
  } },
  { field: 'client', headerName: 'Клиент', width: 200, renderCell: (params) => {
    const { fio, phone } = params.row.client;
    return (
      <Box
        sx={{display: 'flex', flexDirection: 'column'}}
      >
        <span>{fio}</span>
        <b>{phone}</b>
      </Box>
    )
  } },
  { field: 'usluga', headerName: 'Услуга', width: 150, renderCell: (params) => {
    return params.row.usluga.name;
  } },
  { field: 'number', headerName: 'Количество', },
  { field: 'totalPrice', headerName: 'Итоговая цена', width: 150 },
  { field: 'sotrudnik', headerName: 'Сотрудник', width: 150, renderCell: (params) => {
    return params.row.sotrudnik.fio;
  } },
  { field: 'completeDate', headerName: 'Дата Заказа', width: 150, renderCell: (params) => {
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
    return <Chip label="Новый" color="primary" variant="outlined" size='small' />
    },
  },
];


const EmployeesLayout = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order);

  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(routes('getOrders'));    
        dispatch(ordersAdd(response.data))
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  return (
    <>
      <DataTable
        columns={columns}
        rows={orders}
      />
    </>
  )
}

export default EmployeesLayout;