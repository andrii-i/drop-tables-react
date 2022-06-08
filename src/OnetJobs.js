import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ArticleIcon from '@mui/icons-material/Article';

function DisplaySurvey({job}){
  const ref = `/matches/${job.jobID}`
  return (
    <List sx={{ width: '80%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper' }}>
      <ListItemButton href={ref}>
        <ListItemAvatar>
          <Avatar>
            <ArticleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={job.Title} secondary={job.Description} /> {job.jobID}
      </ListItemButton>
    </List>
  )
};

export default function OnetJobs() {
  const [jobs, setJobs] = useState()
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/get_onet_jobs`).then((data) => setJobs(data.data));
  }, []);

  return (
    <Box className='container-center-horizontal'>
      <NavBar />
      <Box sx={{ maxWidth: '80%', ml: 'auto', mr: 'auto', mt: 10 }}>
        <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left' }}>
          Onet Jobs
        </Typography>
      </Box>
      {jobs && jobs.map((job) => <DisplaySurvey job={job}></DisplaySurvey>)}
    </Box>
  )
}
