import React from 'react';
import {useParams} from "react-router-dom";
import Box from '@mui/material/Box';
import NavBar from './NavBar';

export default function ViewRecommendations() {
  const {ResponseID} = useParams();

  return (
    <Box className='container-center-horizontal' sx={{minHeight: '100vh'}}>
      <NavBar />
    </Box>
  );
}
