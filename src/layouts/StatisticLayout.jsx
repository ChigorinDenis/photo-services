import React from 'react';
import axios from 'axios';

import DataTable from '../components/DataTable';

import routes from '../routes';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import GetAppIcon from '@mui/icons-material/GetApp';
import  * as XLSX from 'xlsx'


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { format } from 'date-fns';
import {  id, ru } from 'date-fns/locale'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ChartLayout from './ChartLayout';





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
  { field: 'lastZakazDate', headerName: 'Дата оплаты последнего заказа', width: 300, renderCell: (params) => {
    return format(new Date(params.row.lastZakazDate), 'dd.MM.yyyy')
  }},
  { headerName: 'Время оплаты последнего заказа', width: 300,
  renderCell: (params) => {
    return format(new Date(params.row.lastZakazDate), 'HH:mm')
  }},
  { field: 'num', headerName: 'Частота обращений', width: 300 },
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

const incomeExpenseColumns = [
  { field: 'date', headerName: 'Дата', width: 300},
  { field: 'income', headerName: 'Доход', width: 300},
  { field: 'expense', headerName: 'Расход', width: 300},
]
const materialsColumn = [
  { field: 'name', headerName: 'Название', width: 300},
  { field: 'type', headerName: 'Тип', width: 300},
  { field: 'number', headerName: 'Расход материалов', width: 300},
  { field: 'units', headerName: 'Ед.изм.', width: 300}
]

const convertToExport = (reportName, reportData) => {
  const mapConvert = {
    mostService: {
      headers: ['Услуга', 'Тип услуги', 'Цена', 'Количество обращений'],
      fields: ['name', 'type', 'price', 'num'],
    },
    freqClient: {
      headers: ['Клиент', 'Дата и время оплаты последнего заказа', 'Частота обращения'],
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
    incomeExpense: {
      headers: ['Дата', 'Доход', 'Расход'],
      fields: ['date', 'income', 'expense'],
    },
    materials: {
      headers: ['Название', 'Тип', 'Расход материалов', 'Ед.изм.'],
      fields: ['name', 'type', 'number', 'units'],
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
  incomeExpense: {
    url: (dateStart, dateEnd) => (routes('getIncomeExpense')(dateStart, dateEnd)),
    columns:  incomeExpenseColumns,
    date: true,
  },
  materials: {
    url: (dateStart, dateEnd) =>  (`http://localhost:8080/admin/get-consumption-between-dates/${dateStart}/${dateEnd}`),
    columns: materialsColumn,
    date: true
  }
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
    const ws =  XLSX.utils.aoa_to_sheet(data, 'Some headers');
    XLSX.utils.book_append_sheet(wb, ws, 'Лист1');
    XLSX.writeFile(wb, 'Report.xlsx');
  }
  // const handleOnServerExport = () => {
  //   const url = routes('getIncomeExpenseExcel')(dateStart, dateEnd);
  //   try {
  //     const response = axios.get(url)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
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
      if (name === 'currentIncome' || name === 'incomeExpense') {
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
            <MenuItem value={'materials'}> Отчет по расходу и остатку материалов</MenuItem>
            <MenuItem value={'incomeExpense'}>Доход и расход по дням за период</MenuItem>
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
      <Grid container spacing={2}>
          <Grid item xs={name === 'incomeExpense'? 6 : 12}>
            <DataTable
              columns={setting.columns || []}
              rows={rows || []}
              ExportButton={ExportButton}
              heightTable={'650px'}
            />
          </Grid>
          {name === 'incomeExpense' && <Grid item xs={6}>
            <ChartLayout  type={'income'} dataIncome={rows} />
          </Grid>}
      </Grid>
    </>
  )
}

export default StatisticLayout;