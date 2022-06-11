import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

function DisplayJob({job}){
  const ref = `https://www.onetonline.org/link/summary/${job.JobID}`
  let percentage = (job.Score * 100).toFixed(2);
  let displayPercentage = `${percentage}%`
  return (
    <List sx={{ width: '80%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper' }}>
      <ListItemButton href={ref}>
        <ListItemAvatar sx={{ mr: 3 }}>
          <ListItemText primary={displayPercentage} sx={{ textAlign: 'center', color: '#00966b'}} /> 
          <ListItemText secondary={<Typography style={{ color: '#00966b', fontSize: '15px' }}>match</Typography>} sx={{ textAlign: 'center', mr: 1 }} /> 
        </ListItemAvatar>
        <ListItemText primary={job.Title} secondary={job.Description} /> 
        <ListItemAvatar sx={{ ml: 3 }}>
          <ListItemText secondary={job.JobID} sx={{ textAlign: 'left'}} /> 
        </ListItemAvatar>
      </ListItemButton>
    </List>
  )
};

export default function ViewRecommendations() {
  const {ResponseID} = useParams();
  const [jobs, setJobs] = useState()

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/get_recommendations/${ResponseID}`).then((data) => setJobs(data.data));
  }, [ResponseID]);

  return (
    <Box className='container-center-horizontal' sx={{minHeight: '100vh'}}>
      <NavBar />
      <Box sx={{ maxWidth: '80%', ml: 'auto', mr: 'auto', mt: 10 }}>
        <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left' }}>
          ONet Job Recommendations
        </Typography>
      </Box>
      {jobs && jobs.map((job) => <DisplayJob job={job}></DisplayJob>)}
    </Box>
  );
}
