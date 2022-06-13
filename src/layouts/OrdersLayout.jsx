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



const columns = [
  { field: 'id', headerName: 'id', width: 50 },
  { field: 'orderDate', headerName: 'Дата Заказа', width: 150 },
  { field: 'client', headerName: 'Клиент', width: 300, renderCell: (params) => {
    const { fio, phone } = params.row.client;
    return `${fio} ${phone}`
  } },
  { field: 'usluga', headerName: 'Услуга', width: 150, renderCell: (params) => {
    return params.row.usluga.name;
  } },
  { field: 'number', headerName: 'Количество', width: 150 },
  { field: 'totalPrice', headerName: 'Итоговая цена', width: 150 },
  { field: 'status', headerName: 'Статус', width: 150, renderCell: (params) => {
    return <Chip label="Новая заявка" color="primary" variant="outlined" size='small' />
  } },
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