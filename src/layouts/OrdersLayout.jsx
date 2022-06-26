import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Avatar from '@mui/material/Avatar';
import { employeesAdd } from '../reducers/employeeReducer';
import routes from '../routes';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UpdateStatus from './UpdateStatus';
import GetAppIcon from '@mui/icons-material/GetApp';
import  * as XLSX from 'xlsx'
import { Chip } from '@material-ui/core';
import { ordersAdd } from '../reducers/ordersReducer';
import { openDialog } from '../reducers/uiReducer';
import { sendData } from '../reducers/uiReducer';
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
        <i>{phone}</i>
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
  { field: 'issueDate', headerName: 'Дата выполнения', width: 150, renderCell: (params) => {
    if (!params.row.issueDate) {
      return null;
    }
    return format(new Date(params.row.issueDate), 'dd.MM.yyyy,  hh:mm ')
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
];






const OrdersLayout = () => {

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order);

  const [alignment, setAlignment] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const filterOrders = () => {
    if (alignment==='') {
      return orders;
    }
    const filtered = orders
      .filter((f) => {
        if (alignment === 0) {
          return f.status === 'ISSUED' 
        }
        if (alignment === 1) {
          return f.status === 'COMPLETE'
        }
        if (alignment === 2) {
          return f.status === 'CREATED'
        }
        return true;
      })
      .filter((f) => {
        if (checked) {
          return f.sotrudnik.post === 'Фотограф'
        }
        return true;
      })
     return filtered; 
  }
  const filtered = filterOrders();

  const ExportButton = () => {
    return <Button variant='contained' startIcon={<GetAppIcon />} color='secondary' size='small' onClick={handleOnExport}>Экспорт</Button>
  }
  const convertToExport = (reportData) => {
    const mapped =  {
      headers: ['Дата заказа', 'Клиент', 'Услуга', 'Дата и время выполнения', 'Дата и время выдачи', 'Фотограф', 'Сумма'],
      fields: ['orderDate', ' client', 'usluga', 'issueDate', 'completeDate', 'sotrudnik', 'totalPrice'],
    };
    const convertedData = reportData.reduce((acc, item) => {
      const row = mapped.fields.map((field) => {
        if (field === 'client' || field === 'sotrudnik') {
          return item[field]['fio']
        }
        if (field === 'usluga') {
          return item[field]['name']
        }
        return item[field];
      });
      return [...acc, row]
    }, [mapped.headers])
    return convertedData;
  }
  
  const handleOnExport = () => {
    const data = convertToExport(filtered)
    const wb = XLSX.utils.book_new()
    const ws =  XLSX.utils.aoa_to_sheet(data);
   
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Report.xlsx');
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {   
  //       const response = await axios.get(routes('getOrders'));    
  //       dispatch(ordersAdd(response.data));
  //     } catch(err) {    
  //       console.log(err);
  //     }
  //   }
  //  fetchData();
  // }, []);
  return (
    <>
      <Box sx={{ display: 'flex', mb: 2}}>
        <ToggleButtonGroup
          color="secondary"
          size='small'
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value={0}>Выполненные</ToggleButton>
          <ToggleButton value={1}>Завершенные</ToggleButton>
          <ToggleButton value={2}>Текущие</ToggleButton>
        </ToggleButtonGroup>

        <FormControlLabel control={<Checkbox color='secondary' sx={{ml: 2}} onChange={() => setChecked(!checked)} />}  label="Только фотографы" />
      </Box>
      <DataTable
        columns={columns}
        rows={filtered}
        onRowDoubleClick={(params) => {
          dispatch(openDialog('status'))
          dispatch(sendData({id: params.row.id }))
        }}
        heightTable={'650px'}
        ExportButton={ExportButton}
      />
      <UpdateStatus />
    </>
  )
}

export default OrdersLayout;