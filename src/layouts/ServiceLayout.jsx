import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AddService from "./AddService";
import AddMaterial from "./AddMaterial";
import DataTable from "../components/DataTable";
import { serviceAllAdd } from "../reducers/serviceReducer";
import routes from "../routes";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { IconButton } from "@mui/material";
import { openDialog } from "../reducers/uiReducer";

const columns = [
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'name', headerName: 'Название', width: 150 },
    { field: 'price', headerName: 'Цена', width: 150 },
    { field: 'duration', headerName: 'Длительность', width: 150 },
    { renderCell: (params) => {
      const dispatch = useDispatch();
      return (
        <IconButton color='secondary' title="список материалов" onClick={() => {dispatch(openDialog('material'))}}>
          <ListAltIcon />
        </IconButton> 
      )
    }}
]

const ServiceLayout = () => {
    const services = useSelector(state => state.service);
    const dispatch = useDispatch();
  
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

    return (
        <>
            <DataTable
              columns={columns}
              rows={services}
            />
            <AddService />
            <AddMaterial />
        </>
        
    )
}

export default ServiceLayout;