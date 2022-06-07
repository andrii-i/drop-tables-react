import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function SurveysPage() {
  

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/get_surveys`).then((data) => console.log(data.data));
  }, []);

  return (
    <Box className='container-center-horizontal' sx={{height: '100vh'}}>
      <NavBar />
      <Box sx={{ maxWidth: '80%', ml: 'auto', mr: 'auto', mt: 10 }}>
        <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left' }}>
          Select a Survey to Take
        </Typography>
      </Box>
    </Box>
  )
}
