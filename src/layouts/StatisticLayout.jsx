import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Avatar from '@mui/material/Avatar';
import { employeesAdd } from '../reducers/employeeReducer';
import routes from '../routes';

import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import GetAppIcon from '@mui/icons-material/GetApp';
import  * as XLSX from 'xlsx'
import ToggleButton from '@mui/material/ToggleButton';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { format } from 'date-fns';
import {  id, ru } from 'date-fns/locale'
import { TextField } from '@material-ui/core';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Chip } from '@material-ui/core';
import { ordersAdd } from '../reducers/ordersReducer';




const mostServiceColumns = [
  { field: 'name', headerName: 'Услуга', width: 250},
  { field: 'type', headerName: 'Тип услуги', width: 250},
  { field: 'price', headerName: 'Цена', width: 250 },
  { field: 'num', headerName: 'Количество обращений', width: 250 },
];
const servicesByDateColumns = [
  { field: 'name', headerName: 'Услуга', width: 250},
  { field: 'type', headerName: 'Тип услуги', width: 250},
  { field: 'price', headerName: 'Цена', width: 250 },
  { field: 'num', headerName: 'Количество обращений', width: 250 },
];
const currentIncomeColumns = [
  { field: 'month', headerName: 'Месяц', width: 300},
  { field: 'num', headerName: 'Количество услуг', width: 300},
  { field: 'total', headerName: 'Доход', width: 300, renderCell: (params) => {
    return `${params.row.total} руб.`
  }}, 
];
const freqClientColumns = [
  { field: 'fio', headerName: 'Клиент', width: 300},
  { field: 'lastZakazDate', headerName: 'Дата последнего заказа', width: 300, renderCell: (params) => {
    return format(new Date(params.row.lastZakazDate), 'dd.MM.yyyy')
  }},
  { headerName: 'Время последнего заказа', width: 300,
  renderCell: (params) => {
    return format(new Date(params.row.lastZakazDate), 'HH:mm')
  }},
  { field: 'num', headerName: 'Количество заказов', width: 300 },
];

const salaryColumns = [
  { field: 'fio', headerName: 'Фио', width: 300},
  { field: 'post', headerName: 'Должность', width: 300},
  { field: 'oklad', headerName: 'Оклад', width: 300, renderCell: (params) => {
    return `${params.row.oklad} руб.`
  }},
  { field: 'premiya', headerName: 'Премия', width: 200, renderCell: (params) => {
    return `${params.row.premiya} руб.`
  }},
  { field: 'hours', headerName: 'Часы', width: 200},
  { field: 'zarplata', headerName: 'Зарплата', width: 200},
];

const convertToExport = (reportName, reportData) => {
  const mapConvert = {
    mostService: {
      headers: ['Услуга', 'Тип услуги', 'Цена', 'Количество обращений'],
      fields: ['name', 'type', 'price', 'num'],
    },
    freqClient: {
      headers: ['Клиент', 'Дата и время последнего заказа', 'Количество заказов'],
      fields: ['fio', 'lastZakazDate', 'num'],
    },
    currentIncome: {
      headers: ['Месяц', 'Количество услуг', 'Доход'],
      fields: ['month', 'num', 'total'],
    },
    servicesByDate: {
      headers: ['Услуга', 'Цена', 'Количество'],
      fields: ['name', 'price', 'num'],
    },
    salary: {
      headers: ['ФИО', 'Должность', 'Оклад', 'Премия', 'Часы', 'Зарплата'],
      fields: ['fio', 'post', 'oklad', 'premiya', 'hours','zarplata'],
    },
  }
  const mapped = mapConvert[reportName]
  const convertedData = reportData.reduce((acc, item) => {
    const row = mapped.fields.map((field) => (item[field]));
    return [...acc, row]
  }, [mapped.headers])
  return convertedData;
}

const mapURL = {
  mostService: {
    url: 'http://localhost:8080/admin/get-statistic-by-uslugi',
    date: false,
    columns: mostServiceColumns
  },
  freqClient: {
    url: 'http://localhost:8080/admin/get-statistic-by-clients',
    columns: freqClientColumns,
    date: false,
  },
  currentIncome: {
    url: 'http://localhost:8080/admin/usluga/statistic-by-year/2022',
    columns: currentIncomeColumns,
    date: false,
  },
  servicesByDate: {
    url: (dateStart, dateEnd) => (`http://localhost:8080/admin/usluga/statistic-by-date/${dateStart}/${dateEnd}`),
    columns:  servicesByDateColumns,
    date: true,
  },
  salary: {
    url: (dateStart, dateEnd) => (`http://localhost:8080/admin/get-zarplata-table/${dateStart}/${dateEnd}`),
    columns:  salaryColumns,
    date: true,
  },
}

const StatisticLayout = () => {
  const [setting, setSetting] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [name, setName] = React.useState('');
  const [dateStart, setDateStart] = React.useState(new Date());
  const [dateEnd, setDateEnd] = React.useState(new Date());


  const handleOnExport = () => {
    const data = convertToExport(name, rows)
    const wb = XLSX.utils.book_new()
    const ws =  XLSX.utils.aoa_to_sheet(data);
   
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Report.xlsx');
  }
  const ExportButton = () => {
    return <Button variant='contained' startIcon={<GetAppIcon />} color='secondary' size='small' onClick={handleOnExport}>Экспорт</Button>
  }
  const handleChange = (event) => {
    setRows([])
    setName(event.target.value);
    const setting = mapURL[event.target.value];
    setSetting(setting);
  };

  const handleShow = async () => {
    let url;
    if (setting.date) {
      url = setting.url(format(dateStart, 'yyyy-MM-dd'), format(dateEnd, 'yyyy-MM-dd'))
    }
    else {
      url = setting.url;
    }
    try {   
      const response = await axios.get(url);
      if (name === 'currentIncome') {
        const statistic = response.data.map((item, id) => ({id, ...item}));
        setRows(statistic);
      }
      else {
        setRows(response.data);
        console.log(response.data)
      }
      
    } catch(err) {    
      console.log(err);
    }
  };

  const SelectStatisticBlock = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}  locale={ru}>
      <Box sx={{ display: 'flex', gap: 5, mb: 5 }}>
        <FormControl >
          <InputLabel>Выбрать статистику</InputLabel>
          <Select
            value={name}
            label="Выбрать статистику"
            onChange={handleChange}
            sx={{ minWidth: '500px'}}
            size="medium"
          >
            <MenuItem value={'mostService'}>Отчет по наиболее востребованным услугам</MenuItem>
            <MenuItem value={'freqClient'}>Отчет по частоте обращения клиентов, последние заказы</MenuItem>
            <MenuItem value={'currentIncome'}>Отчет по доходу фотосалона за текущий год</MenuItem>
            <MenuItem value={'servicesByDate'}>Отчет оказанным услугам за опледеленный период</MenuItem>
            <MenuItem value={'salary'}>Расчет заработной платы за период</MenuItem>
          </Select>
        </FormControl>
        {setting.date && <>
          <DesktopDatePicker
            label="Дата начала"
            inputFormat="MM/dd/yyyy"
            value={dateStart}
            onChange={(newValue)=> {setDateStart(newValue)}}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="Дата конца"
            inputFormat="MM/dd/yyyy"
            value={dateEnd}
            onChange={(newValue)=> {setDateEnd(newValue)}}
            renderInput={(params) => <TextField {...params} />}
          />
        </>}
        
        <Button 
          variant="contained"
          size="small"
          color="secondary"
          sx={{mr:1}}
          onClick={handleShow}
        >
          Показать
        </Button>
      </Box>
      </LocalizationProvider>
    )
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {   
  //       const response = await axios.get('http://localhost:8080/admin/get-statistic-by-uslugi');    
  //       console.log(response.data)
  //     } catch(err) {    
  //       console.log(err);
  //     }
  //   }
  //  fetchData();
  // }, []);
  return (
    <>
      <SelectStatisticBlock />
      <DataTable
        columns={setting.columns || []}
        rows={rows || []}
        ExportButton={ExportButton}
      />
    </>
  )
}

export default StatisticLayout;