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

function DisplaySurvey({survey}){
  const ref = `/surveys/${survey.SurveyID}`
  return (
    <List sx={{ width: '80%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper' }}>
      <ListItemButton href={ref}>
        <ListItemAvatar>
          <Avatar>
            <ArticleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={survey.Name} secondary={survey.Description} />
      </ListItemButton>
    </List>
  )
};

export default function SurveysPage() {
  const [surveys, setSurveys] = useState()
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/get_surveys`).then((data) => setSurveys(data.data));
  }, []);

  return (
    <Box className='container-center-horizontal' sx={{height: '100vh'}}>
      <NavBar />
      <Box sx={{ maxWidth: '80%', ml: 'auto', mr: 'auto', mt: 10 }}>
        <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left' }}>
          Select a Survey to Take
        </Typography>
      </Box>
      {surveys && surveys.map((survey) => <DisplaySurvey survey={survey}></DisplaySurvey>)}
      <List sx={{ width: '80%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper' }}>
      <ListItemButton href={'/profiles'}>
        <ListItemAvatar>
          <Avatar>
            <ArticleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Job Preferences Profile" secondary="This survey asks you to fill out your preferences for various job characteristics." />
      </ListItemButton>
    </List>
    </Box>
  )
}
