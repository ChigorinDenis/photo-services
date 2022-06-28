import React, { useEffect }from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Paper } from "@mui/material";
import { Bar, Line, Pie } from 'react-chartjs-2';
import groupby from 'lodash.groupby';
import countBy from 'lodash.countby';
import uniq from "lodash.uniq";
import Box from '@mui/material/Box';
import { format, getMonth, startOfMonth, lastDayOfMonth, isWithinInterval} from  'date-fns';
import randomColor from 'random-material-color';
import routes from '../routes';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {  id, ru } from 'date-fns/locale'
import { TextField } from '@material-ui/core';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const getOptions = (text, max) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text,
    },
  },
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: max,
    }
  }
});



const countClients = (inputData, dateStart, dateEnd) => {
  const filtered = filterDate(inputData, dateStart, dateEnd);
  const grouped = groupby(filtered, (item) => {
    return format(new Date(item.orderDate), 'dd.MM.yyyy');
  });
  const counted = Object.entries(grouped).reduce((acc, [key, arr]) =>{
    const uniq = [];
    arr.forEach((value) => {
      const { client } = value;
      if (!uniq.includes(client.id)) {
        uniq.push(client.id);
      }
    });
    acc.labels.push(key.slice(0, 5));
    acc.data.push(uniq.length)
    return acc;
  }, { labels: [], data: [] });
  const data = {
    labels: counted.labels,
    datasets: [
      {
        label: 'Клиенты',
        data: counted.data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const options = getOptions('Диаграмма количества клиентов в день', Math.max(...counted.data) + 5);
  return <Line data={data} options={options} />
}

const countAllService = (inputData, dateStart, dateEnd) => {
  const filtered = filterDate(inputData, dateStart, dateEnd);
  const counted = countBy(filtered, (item) => (item.usluga.name))
  const labels = Object.keys(counted);
  const backgroundColor = uniq(Array(100).fill(1).map(() => (randomColor.getColor())));
  const data = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(counted),
        backgroundColor: backgroundColor.slice(0, labels.length),
      },
    ],
  };
  const options = getOptions('Все услуги', Math.max(...Object.values(counted)))
  return <Pie data={data} options={options} />
}
const countOneService = (inputData, dateStart, dateEnd, id) => {
  const filtered = filterDate(inputData, dateStart, dateEnd)
  const grouped = groupby(filtered, (item) => {
    return format(new Date(item.orderDate), 'dd.MM.yyyy');
  });
  const counted = Object.entries(grouped).reduce((acc, [key, arr]) => {
    let counter = 0;
    arr.forEach((value) => {
      const { usluga } = value;
      if (usluga.id === id) {
        counter += 1;
      }
    });
    acc.labels.push(key.slice(0, 5));
    acc.data.push(counter);
    return acc;
  }, { labels: [], data: []});

  const data = {
    labels: counted.labels,
    datasets: [
      {
        label: 'Услуга',
        data: counted.data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const options = getOptions('График по определенной услуге', Math.max(...counted.data));
  return <Line options={options} data={data} />
}

const countIncomeExpense = (inputData) => {
  const counted = inputData
      .reduce((acc, item) => {
        acc.labels.push(item.date.slice(0, 5));
        acc.incomes.push(item.income)
        acc.expenses.push(item.expense);
        return acc;
      }, { labels: [], incomes: [], expenses: []})
  const data = {
      labels: counted.labels,
      datasets: [
        {
          label: 'Доход',
          data: counted.incomes,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Расход',
          data: counted.expenses,    
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    const options = getOptions('Диаграмма дохода и расхода фотосалона', 3000)
    return <Bar data={data} options={options} />
}

const countMaterial = (materials) => {
  const data = {
    labels: materials.labels,
    datasets: [
      {
        label: 'Расходник',
        data: materials.totals,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const options = getOptions('Диаграмма расходных материалов',5)
  return <Line data={data} options={options} />
}

const filterDate = (inputData, dateStart, dateEnd) => {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const filtered = inputData.filter((item) => {
    const orderDate = new Date(item.orderDate);
    return isWithinInterval(orderDate, { start, end })
  });
  return filtered;
}

function ChartLayout(props) {
  const {
    type,
    dataIncome,
    dataStock
  } = props;

  const [materials, setMaterials] = React.useState([]);
  const [idMaterial, setIdMaterial] = React.useState(1);
  const [idService, setIdService] = React.useState(1);
  const [dateStart, setDateStart] = React.useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
  const [dateEnd, setDateEnd] = React.useState(format(lastDayOfMonth(new Date()), 'yyyy-MM-dd'));



  const handleChange = (event) => {
    setIdService(event.target.value);
  };

  const handleChangeId = (event) => {
    setIdMaterial(event.target.value);
  };

  const handleChangeStart = (event) => {
    setDateStart(event.target.value);
  };

  const handleChangeEnd = (event) => {
    setDateEnd(event.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response= await axios.get(`http://localhost:8080/admin/get-consumption-between-dates-for-one/${dateStart}/${dateEnd}/${idMaterial}`);
        const counted = response.data
          .reduce((acc, item) => {
            acc.labels.push(item.date.slice(0,5));
            acc.totals.push(item.total)
            return acc;
          }, { labels: [], totals: []})
          setMaterials(counted);
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, [dateStart, dateEnd, idMaterial]);

  const orders = useSelector(state => state.order);
  const services = useSelector(state => state.service);
 
  return (
    <>
      {type ==='service' && 
      <>
        <Paper>
          {countOneService(orders, dateStart, dateEnd, idService)}
          <FormControl sx={{ width: '50%'}} size="small">
            <InputLabel>Выбрать статистику</InputLabel>
            <Select
              value={idService}
              label="Выбрать статистику" 
              size="small"
              onChange={handleChange}
            >
            
              {services.map(({ id, name }) => (
                <MenuItem value={id}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper>
          {countAllService(orders, dateStart, dateEnd)}
            <TextField
              type="date"
              variant="outlined"
              defaultValue={dateStart}
              label="Начало периода"
              value={dateStart}
              onChange={handleChangeStart}
            />
            <TextField
              type="date"
              variant="outlined"
              defaultValue={dateEnd}
              label="Конец периода"
              value={dateEnd}
              onChange={handleChangeEnd}
            />
        </Paper>
      </>
      }
      {type === 'client' &&  
        <Paper>
          {countClients(orders, dateStart, dateEnd)}
          <TextField
              type="date"
              variant="outlined"
              defaultValue={dateStart}
              label="Начало периода"
              value={dateStart}
              onChange={handleChangeStart}
            />
            <TextField
              type="date"
              variant="outlined"
              defaultValue={dateEnd}
              label="Конец периода"
              value={dateEnd}
              onChange={handleChangeEnd}
            />
        </Paper>
      }
      {type === 'income' && countIncomeExpense(dataIncome)}
      {type === 'material' &&
      <Paper>
        {countMaterial(materials)}
        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
            <TextField
              type="date"
              variant="outlined"
              defaultValue={dateStart}
              label="Начало периода"
              value={dateStart}
              onChange={handleChangeStart}
            />
            <TextField
              type="date"
              variant="outlined"
              defaultValue={dateEnd}
              label="Конец периода"
              value={dateEnd}
              onChange={handleChangeEnd}
            />
            <FormControl sx={{ width: '30%'}} size="small">
            <InputLabel>Выбрать статистику</InputLabel>
            <Select
              value={idMaterial}
              label="Выбрать статистику" 
              size="small"
              onChange={handleChangeId}
            >
            
              {dataStock.map(({ id, name, type }) => (
                <MenuItem value={id}>{`${name} ${type}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </Box>
      </Paper>
      }
    </>
  )
}

export default ChartLayout;