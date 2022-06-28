import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import { Box } from '@mui/system';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { stockAllAdd } from '../reducers/stockReducer';
import routes from '../routes';
import { format } from 'date-fns';
import  * as XLSX from 'xlsx'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { Button, Typography } from '@mui/material';
import ChartLayout from './ChartLayout';
import { host } from '../routes';

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
  const [alignment, setAlignment] = React.useState(30);
  const [planningStock, setPlanningStock] = React.useState([]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleOnExport = () => {
    const calcStock = calcMaterials(planningStock, alignment)
      .map((item) => {
        return [
          item.name,
          item.type,
          item.number,
          item.units,
          item.price * item.number
        ]
      })
    
    const today = format(new Date, 'dd.MM.yyyy');
    const title = `Заявка на закупку расходных материалов от ${today}`;
    const data = [[title],['Название', 'Тип',  'Количество', 'Ед.изм' ,' Общая цена'], ...calcStock];
    const wb = XLSX.utils.book_new()
    const ws =  XLSX.utils.aoa_to_sheet(data);
    const merges = [{ e: { c: 4, r: 0}, s: { c: 0, r: 0}}];
    ws['!merges'] = merges;
    XLSX.utils.book_append_sheet(wb, ws, 'Лист1');
    XLSX.writeFile(wb, `${title}.xlsx`);
  }

  const calcMaterials = (stock, value) => {
    const mapped = stock
      .map((material) => {
        const newValue = Math.round((material.number / 30) * value);
        return {
          ...material,
          number: newValue
        }
      })
    return mapped;
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(`${host}/statistik/get-statik`);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <Typography variant='h6'  >Расходные материалы</Typography>
        <Button variant='outlined' color="secondary" endIcon={<RequestQuoteIcon />} onClick={handleOnExport}>Заявка на закупку</Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Typography variant='h6' >Планируемая закупка материалов</Typography>
          <ToggleButtonGroup
            color="secondary"
            size='small'
           
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value={10} >10 дней</ToggleButton>
            <ToggleButton value={15} >15 дней</ToggleButton>
            <ToggleButton value={30}>Месяц</ToggleButton>
            <ToggleButton value={90}>3 Месяца</ToggleButton>
            
          </ToggleButtonGroup>
          
        </div>
        
        
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      > <Box sx={{width: '60%'}}>
          <DataTable
            columns={columns}
            rows={stock}
            heightTable={'100%'}
          />
       </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '40%'
          }}
        >
          
          <DataTable
              columns={columns}
              rows={calcMaterials(planningStock, alignment)}
              heightTable={'300px'}
          />
          <ChartLayout type={'material'} dataStock={stock}/>
        </Box>
      </Box>
    </>
  )
}

export default StockLayout;