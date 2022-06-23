import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Avatar from '@mui/material/Avatar';
import AddDiscount from './AddDiscount';
import routes from '../routes';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import { Chip } from '@material-ui/core';
import { clientsAdd } from '../reducers/clientsReducer';
import format from 'date-fns/format';




const columns = [
  { field: 'fio', headerName: 'ФИО', width: 150 },
  { field: 'username', headerName: 'Имя пользователя', width: 150 },
  { field: 'email', headerName: 'Эл.почта', width: 150 },
  { field: 'phone', headerName: 'Номер телефона', width: 150 },
  { field: 'skidka', headerName: 'Скидка', width: 150 },
  { field: 'basisToSkidka', headerName: 'Основание для скидки', width: 250 },
];


const ClientLayout = () => {
  const dispatch = useDispatch();

  const client = useSelector((state) => state.client);

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
  return (
    <>
      <DataTable
        columns={columns}
        rows={client}
      />
      <AddDiscount />
    </>
  )
}

export default ClientLayout;