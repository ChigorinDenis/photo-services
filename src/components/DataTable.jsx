import React from 'react';
import { DataGrid, ruRU, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box } from '@material-ui/core';
import GetAppIcon from '@mui/icons-material/GetApp';



export default function DataTable(props) {
  const { rows, columns, onRowClick, ExportButton, onRowDoubleClick, rowHeight , heightTable} = props;

  const Toolbar = () => {
    return (
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt:2,
        mr:2
      }}
      >
        <GridToolbar />
        {ExportButton && ExportButton()}
      </Box>
    )
  }
  return (
    <div style={{ height: heightTable, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        expandableRows={true}
        components={{
          Toolbar: Toolbar,
        }}
        onRowClick={(params, event) => {
          onRowClick && onRowClick(params)
        }}
        onRowDoubleClick={(params, event) => {
          onRowDoubleClick && onRowDoubleClick(params)
        }}
        rowHeight={rowHeight || 50}
      />
    </div>
  );
}