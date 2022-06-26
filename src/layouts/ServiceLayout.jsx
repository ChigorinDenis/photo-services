import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import AddService from "./AddService";
import AddMaterial from "./AddMaterial";
import DataTable from "../components/DataTable";
import { serviceAllAdd } from "../reducers/serviceReducer";
import routes from "../routes";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Badge, IconButton, ListItemButton, ListSubheader, Typography } from "@mui/material";
import { openDialog, sendData } from "../reducers/uiReducer";
import ChartLayout from "./ChartLayout";

const columns = [
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'name', headerName: 'Название', width: 300 },
    { field: 'price', headerName: 'Цена', width: 150 },
    { field: 'duration', headerName: 'Длительность', width: 150 },
    { renderCell: (params) => {
      const dispatch = useDispatch();
      return (
        <IconButton color='secondary' title="список материалов" onClick={() => {
          dispatch(openDialog('material'))
          dispatch(sendData({id_uslugi: params.row.id }))
          }}>
          <ListAltIcon />
        </IconButton> 
      )
    }}
]

const ServiceLayout = () => {
    const services = useSelector(state => state.service);
    const dispatch = useDispatch();
    const [materials, setMaterials] = React.useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
          try {   
            const response = await axios.get(routes('getServices')); 
            dispatch(serviceAllAdd(response.data))
          } catch(err) {    
            console.log(err);
          }
        }
       fetchData();
      }, []);

    const handleRowClick = async (params) => {
      const { id } = params.row;
      const url = `http://localhost:8080/sotrudnik/get-rashodniki-by-usluga/${id}`
      try {   
        const response = await axios.get(url); 
        dispatch(setMaterials(response.data))
      } catch(err) {    
        console.log(err);
      }
    }

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <DataTable
              columns={columns}
              rows={services}
              onRowClick={handleRowClick}
              heightTable='100%'
            />
          </Grid>
          <Grid item xs={3}>
            <ChartLayout  type={'service'}/>
          </Grid>
        </Grid>
        <AddService />
        <AddMaterial />
      </>
    )
            
            {/* <List 
              sx={{
                minWidth: '300px',
                bgcolor: 'background.paper',
                border: '1px solid #e0e0e0',
              }}
            >
              <ListSubheader>Расходные материалы</ListSubheader>
              {
                materials.map((material) => {
                  const {
                    id,
                    numbers,
                    sklad
                  } = material;
                  return (
                    <ListItem key={id}>
                      <ListItemText
                          primary={sklad.name}
                          secondary={sklad.type}
                      />
                        <Badge>{numbers} {sklad.units}</Badge>
                    </ListItem>
                  )
                }) 
              }
              {materials.length ===0 && <Typography variant="body2" sx={{ml: 5, mt: 5}}>Нет расходников</Typography>}
            </List> */}     
    
}

export default ServiceLayout;