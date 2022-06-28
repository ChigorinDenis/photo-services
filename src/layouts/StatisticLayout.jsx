import React, {useRef} from 'react';
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
import { Link } from '@mui/material';
import fileDownload from 'js-file-download';




const mostServiceColumns = [
  { field: 'name', headerName: 'Услуга', width: 250},
  { field: 'type', headerName: 'Тип услуги', width: 250},
  { field: 'price', headerName: 'Цена', width: 250 },
  { field: 'num', headerName: 'Количество обращений', width: 250 },
];
const servicesByDateColumns = [
  { field: 'name', headerName: 'Услуга', width: 250},
  { field: 'price', headerName: 'Цена', width: 250 },
  { field: 'num', headerName: 'Количество обращений', width: 250 },
  { field: 'total', headerName: 'Общая стоимость', width: 250 },
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
  { field: 'total', headerName: 'Ед.изм.', width: 300}
]

const discountColumn = [
  { field: 'fio', headerName: 'Клиент', width: 300},
  { field: 'usluga', headerName: 'Услуга', width: 300},
  { field: 'skidka', headerName: 'Скидка', width: 300},
  { field: 'total', headerName: 'Цена со скидкой.', width: 300},
  { field: 'sotrudnik', headerName: 'Сотрудник', width: 300}
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
      title: 'Расчет заработной платы за период'
    },
    incomeExpense: {
      headers: ['Дата', 'Доход', 'Расход'],
      fields: ['date', 'income', 'expense'],
      
    },
    materials: {
      headers: ['Название', 'Тип', 'Расход материалов', 'Ед.изм.'],
      fields: ['name', 'type', 'number', 'units'],
      
    },
    discount: {
      headers: ['Клиент', 'Услуга', 'Скидка', 'Цена со скидкой', 'Сотрудник'],
      fields: ['fio', 'usluga', 'skidka', 'total', 'sotrudnik'],
    }
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
    urlFile: 'http://localhost:8080/admin/print-statistic-by-uslugi',
    date: false,
    columns: mostServiceColumns,
    title: 'Отчет по наиболее востребованным услугам'
  },
  freqClient: {
    url: 'http://localhost:8080/admin/get-statistic-by-clients',
    urlFile: 'http://localhost:8080/admin/print-get-statistic-by-clients',
    columns: freqClientColumns,
    date: false,
    title: 'Отчет по частоте обращения клиентов, последние заказы'
  },
  currentIncome: {
    url: 'http://localhost:8080/admin/usluga/statistic-by-year/2022',
    urlFile: 'http://localhost:8080/admin/usluga/print-statistic-by-year/2022',
    columns: currentIncomeColumns,
    date: false,
    title: 'Отчет по доходу фотосалона за текущий год'
  },
  servicesByDate: {
    url: (dateStart, dateEnd) => (`http://localhost:8080/admin/usluga/statistic-by-date/${dateStart}/${dateEnd}`),
    urlFile: (dateStart, dateEnd) => (`http://localhost:8080/admin/usluga/print-statistic-by-date/${dateStart}/${dateEnd}`),
    columns:  servicesByDateColumns,
    date: true,
    title: 'Отчет оказанным услугам за опледеленный период'
  },
  salary: {
    url: (dateStart, dateEnd) => (`http://localhost:8080/admin/get-zarplata-table/${dateStart}/${dateEnd}`),
    urlFile: (dateStart, dateEnd) => (`http://localhost:8080/admin/print-zarplata-table/${dateStart}/${dateEnd}`),
    columns:  salaryColumns,
    date: true,
  },
  incomeExpense: {
    url: (dateStart, dateEnd) => (routes('getIncomeExpense')(dateStart, dateEnd)),
    urlFile: (dateStart, dateEnd) => (routes('getIncomeExpenseExcel')(dateStart, dateEnd)),
    columns:  incomeExpenseColumns,
    date: true,
    title: 'Доходы и расходы фотосалона'
  },
  materials: {
    url: (dateStart, dateEnd) =>  (`http://localhost:8080/admin/get-consumption-between-dates/${dateStart}/${dateEnd}`),
    urlFile: (dateStart, dateEnd) =>  (`http://localhost:8080/admin/print-consumption-between-dates/${dateStart}/${dateEnd}`),
    columns: materialsColumn,
    date: true,
    title: 'Отчет по расходу и остатку материалов'
  },
  discount: {
    url: 'http://localhost:8080/admin/get-client-skidka-usluga-sotrudnik',
    columns: discountColumn,
    date: false,
    title: 'Отчет по скидкам'
  }
}

const StatisticLayout = () => {
  const [setting, setSetting] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [name, setName] = React.useState('');
  const [dateStart, setDateStart] = React.useState(new Date());
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const linkEl = useRef(null);

  const handleOnExport = () => {
    const data = convertToExport(name, rows)
    const wb = XLSX.utils.book_new()
    const ws =  XLSX.utils.aoa_to_sheet([[setting.title], ...data], 'Some headers');
    const merges = [{ e: { c: 5, r: 0}, s: { c: 0, r: 0}}];
    ws['!merges'] = merges;
    XLSX.utils.book_append_sheet(wb, ws, 'Лист1');
    XLSX.writeFile(wb, `${setting.title}.xlsx`);
  }
  const handleOnServerExport =  () => {
    let urlFile;
    if (setting.date) {
      urlFile = setting.urlFile(format(dateStart, 'yyyy-MM-dd'), format(dateEnd, 'yyyy-MM-dd'))
    }
    else {
      urlFile = setting.urlFile;
    }
    // const url = routes('getIncomeExpenseExcel')(format(dateStart, 'yyyy-MM-dd'), format(dateEnd, 'yyyy-MM-dd'));
    // const url = 'http://localhost:8080/admin/get-consumption-between-dates/2022-06-13/2022-06-20'
    try {
      axios({
        url: urlFile,
        method: 'POST',
        responseType: 'blob', // Important
      }).then(({ data: blob}) => {
        const url = URL.createObjectURL(blob);
        linkEl.current.href = url;
        linkEl.current.download = `${setting.title}.xlsx`;
        linkEl.current.click();
      });
      
    } catch (err) {
      console.log(err)
    }
  }
  const ExportButton = () => {
    const handleExcel = name === 'discount' ? handleOnExport : handleOnServerExport;
    return <Button variant='contained' startIcon={<GetAppIcon />} color='secondary' size='small' onClick={handleExcel}>Экспорт</Button>
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
      if (name === 'currentIncome' || name === 'incomeExpense' || name === 'discount') {
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
            <MenuItem value={'discount'}> Отчет по скидкам</MenuItem>
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
      <Link href='#' sx={{display: 'none'}} ref={linkEl}>Скачать</Link>
      
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