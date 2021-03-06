import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import routes from '../routes';
import { employeeAdd } from '../reducers/employeeReducer';
import { closeDialog } from '../reducers/uiReducer'


function AddEmployeeForm(props) {
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);

  const ui = useSelector((state) => state.ui);
  const [post, setPost] = React.useState('');
  const [urlImage, setUrlImage] = React.useState({});
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setUrlImage({
        image: URL.createObjectURL(img)
      });
    }
  };
  const handleChange = (event) => {
    setPost(event.target.value);
  };

  const handleClose = () => {
    dispatch(closeDialog('employee'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = {
      fio: formData.get('fio'),
      username: formData.get('username'),
      post,
      phone: formData.get('phone'),
      oklad: formData.get('oklad'),
      premiya: formData.get('premiya'),
    };
    const url = routes('addEmployee');
    formData.delete('fio');
    formData.delete('username');
    formData.delete('phone');
    formData.delete('oklad');
    formData.delete('premiya');

    try {
      const response = await axios.post(url, user);
      const employee = response.data;
      const urlAva = routes('addAva')(employee.id)
      await   axios.post(urlAva, formData, {
        headers: {
            "Content-type": "multipart/form-data",
        }});
      dispatch(employeeAdd(employee));
    } catch (error) {
      console.log(error)
    }
    handleClose();
  };
  return (
    <Dialog onClose={handleClose} open={ui.dialogs['employee']}>
      <DialogTitle>???????????????? ????????????????????</DialogTitle>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              <Grid
                item xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "40px"
                }}
              >
                <Avatar alt="Remy Sharp" src={urlImage.image}  sx={{ width: 80, height: 80 }} />
                <Button
                  variant="text"
                  color='secondary'
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                >
                    ?????????????? ????????
                  </Button>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="??????"
                  name="fio"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'none' }}>
                <TextField
                  required
                  fullWidth
                  label="file"
                  name="file"
                  type="file"
                  inputRef={inputFileRef}
                  onChange={onImageChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="?????? ????????????????????????"
                  name="username"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="add-post-select-label">??????????????????</InputLabel>
                  <Select
                    labelId="add-post-select-label"
                    id="add-post-select"
                    value={post}
                    label="??????????????????"
                    onChange={handleChange}
                  >
                    <MenuItem value={'????????????????'}>????????????????</MenuItem>
                    <MenuItem value={'????????????????'}>????????????????</MenuItem>
                    <MenuItem value={'????????????????'}>????????????????</MenuItem>
                    <MenuItem value={'????????????????'}>????????????????</MenuItem>
                    <MenuItem value={'??????????????????'}>??????????????????</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="??????????????"
                  name="phone"
                  type={'tel'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="??????????"
                  name="oklad"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="????????????"
                  name="premiya"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2, color: '#fff', boxShadow: 'none' }} 
            >
              ????????????????
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}

export default AddEmployeeForm;


