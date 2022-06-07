import React from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import {useParams} from "react-router-dom";

export default function TakingURESurvey() {
  return (
    <Box className='container-center-horizontal' sx={{height: '100vh'}}>
      <NavBar />
      <div style={{color: "white"}}>
        This is take URE survey
      </div>
    </Box>
  );
}