import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import { Box } from '@mui/system';
import { stockAllAdd } from '../reducers/stockReducer';
import routes from '../routes';
import { Typography } from '@mui/material';

const columns = [
  { field: 'name', headerName: 'Название', width: 150 },
  { field: 'type', headerName: 'Тип', width: 150 },
  { field: 'number', headerName: 'Количество', width: 150 },
  { field: 'units', headerName: 'Ед. измерения', width: 150 },
  { field: 'price', headerName: 'Цена', width: 150 },
];

const StockLayout = () => {
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.stock);
  const [planningStock, setPlanningStock] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get('http://localhost:8080/statistik/get-statik');
        
        setPlanningStock(response.data);
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, [planningStock]);
 
  return (
    <>
      <Box sx={{display: 'flex', mb:2 , justifyContent: 'space-between'}}>
        <Typography variant='h6'  >Расходные материалы</Typography>
        <Typography variant='h6'   >Планируемая закупка материалов</Typography>
        
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <DataTable
          columns={columns}
          rows={stock}
        />
       
          <DataTable
            columns={columns}
            rows={planningStock}
          />
      
      </Box>
    </>
  )
}

export default StockLayout;