import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import AddDiscount from './AddDiscount';
import routes from '../routes';
import Box from '@mui/material/Box';
import { discountAdd } from '../reducers/discountReducer';




const columns = [
  { field: 'basis', headerName: 'Основание скидки', width: 150 },
  { field: 'size', headerName: 'Размер скидки', width: 150 },
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
  { field: 'sotrudnik', headerName: 'Сотрудник', width: 150, renderCell: (params) => {
    return params.row.sotrudnik.fio;
  } },

];


const DiscountLayout = () => {
  const dispatch = useDispatch();

  const discount = useSelector((state) => state.discount);

  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(routes('getDiscount'));    
        dispatch(discountAdd(response.data))
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
        rows={discount}
        heightTable={'650px'}
      />
      <AddDiscount />
    </>
  )
}

export default DiscountLayout;