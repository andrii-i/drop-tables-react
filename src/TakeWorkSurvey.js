import React from 'react'
import Box from '@mui/material/Box';
import NavBar from './NavBar';

export default function TakeWorkSurvey() {
  return (
    <Box className='container-center-horizontal' sx={{height: '100vh'}}>
    <NavBar />
    <div style={{color: "white"}}>
      Take Work Survey
    </div>
  </Box>
  )
}
