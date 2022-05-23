import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import { stockAllAdd } from '../reducers/stockReducer';
import routes from '../routes';

const columns = [
  { field: 'id', headerName: 'id', width: 150 },
  { field: 'name', headerName: 'Название', width: 150 },
  { field: 'type', headerName: 'Тип', width: 150 },
  { field: 'number', headerName: 'Количество', width: 150 },
  { field: 'units', headerName: 'Ед. измерения', width: 150 },
  { field: 'price', headerName: 'Цена', width: 150 },
];

const StockLayout = () => {
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.stock);
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(routes('getStock'));    
        dispatch(stockAllAdd(response.data))
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  return (
    <DataTable
      columns={columns}
      rows={stock}
    />
  )
}

export default StockLayout;