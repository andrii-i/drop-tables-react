import React from 'react';
// import './styles/AnonLandingPage.css';
import logo from './images/undraw-people-search.svg';
import NavBar from './NavBar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { useAuth } from "./contexts/authContext";

export function AnonLandingPage() {
  // const { currentUser } = useAuth();
  // console.log(currentUser)
  return (
    <Box className='container-center-horizontal' sx={{height: '100vh'}}>
      <NavBar />
      <Grid container spacing={2} sx={{ background: '#141623', mt: 8 }}>
        <Grid item xs={6} sx={{ background: '#141623' }}>
          <Typography variant="h1" component="div" sx={{ maxWidth: '80%', ml: 'auto', color: 'white', textAlign: 'left' }}>
            Discover your next career.
          </Typography>
          <Typography variant="h4" component="div" sx={{ maxWidth: '80%', ml: 'auto', color: 'gray', textAlign: 'left', mt: 5 }}>
            We match your experiences with jobs on ONet* along with professional experiences.
          </Typography>
          <Box display='flex' sx={{ maxWidth: '80%', ml: 'auto'}}>
            <Button
              variant='contained'
              // onClick={handleSubmit}
              sx={{ mt: 5, backgroundColor: '#00966b', fontWeight: 'bold' }}
            >
              Fill Survey
            </Button>
           </Box>
        </Grid>
        <Grid item xs={6} sx={{ background: '#141623'}}>
          <div className='filler2'>
            <img className='undraw_people_search' src={logo} alt='logo' />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
