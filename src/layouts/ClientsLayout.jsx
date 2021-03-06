import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import AddDiscount from './AddDiscount';
import routes from '../routes';
import Grid from '@mui/material/Grid';
import { clientsAdd } from '../reducers/clientsReducer';
import ChartLayout from './ChartLayout';





const columns = [
  { field: 'fio', headerName: 'ФИО', width: 300 },
  { field: 'username', headerName: 'Имя пользователя', width: 150 },
  { field: 'email', headerName: 'Эл.почта', width: 150 },
  { field: 'phone', headerName: 'Номер телефона', width: 150 },
  { field: 'skidka', headerName: 'Скидка', width: 100 },
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
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <DataTable
          columns={columns}
          rows={client}
          heightTable={'650px'}
        />
      </Grid>
      <Grid item xs={4}>
        <ChartLayout  type={'client'}/>
      </Grid>
      </Grid>
      <AddDiscount />
    </>
  )
}

export default ClientLayout;