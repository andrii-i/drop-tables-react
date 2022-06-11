import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useAuth } from "./contexts/authContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ArticleIcon from '@mui/icons-material/Article';
import axios from 'axios';
import Button from '@mui/material/Button';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.0rem', color: 'white' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

function DisplaySurvey({survey}){
  console.log(survey);
  const ref = `/recommendations/${survey.SurveyResponseID}`
  return (
    <List sx={{ width: '100%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArticleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={survey.Name} secondary={survey.Category + ' - ' + survey.DateCompleted.split('00')[0]} sx={{ color: 'black' }} />
        <Button variant='contained' href={ref} sx={{ backgroundColor: '#00966b'}}>
          Job Recommendations
        </Button>
      </ListItem>
    </List>
  )
};

function DisplayProfile({profile}){
  console.log("this is profile", profile);
  const ref = `/recommendations_profile/${profile.DesPID}`
  return (
    <List sx={{ width: '100%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArticleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={profile.Name} sx={{ color: 'black' }} />
        <Button variant='contained' href={ref} sx={{ backgroundColor: '#00966b'}}>
          Job Recommendations
        </Button>
      </ListItem>
    </List>
  )
};

export default function UserLandingPage() {
  const { currentUser } = useAuth();
  const [surveysTaken, setSurveys] = useState();
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    if(currentUser){
      console.log("Hi there " + currentUser.multiFactor.user.email);
      axios.get(`http://127.0.0.1:5000/get_response/${currentUser.multiFactor.user.email}`).then((data) => setSurveys(data.data));
      axios.get(`http://127.0.0.1:5000/get_profile/${currentUser.multiFactor.user.email}`).then((data) => setProfiles(data.data));
    }
  }, [currentUser])

  return (
    <Box className='container-center-horizontal' sx={{minHeight: '100vh'}}>
      <NavBar />
      <Box sx={{ maxWidth: '80%', ml: 'auto', mr: 'auto', mt: 10 }}>
        <Link href='/onet_jobs' style={{ textDecoration: 'none' }}>
          <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left', mt: 3 }}>
            ONet Job Search
          </Typography>
        </Link>
        <Link href='/surveys' style={{ textDecoration: 'none' }}>
          <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left', mt: 3 }}>
            Take A Survey
          </Typography>
        </Link>
        <Link href='/profiles' style={{ textDecoration: 'none' }}>
          <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left', mt: 3 }}>
            Create A Job Preferences Profile
          </Typography>
        </Link>
        <Accordion sx={{ background: '#141623', mt: 2, ml: -2 }} elevation={0}>
          <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography variant='h5' component='div' sx={{ color: 'white', flexShrink: 0 }}>
              My Surveys Taken
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'white', textAlign: 'left', ml: 4 }}>
              {surveysTaken && surveysTaken.map((survey) => <DisplaySurvey survey={survey} />)}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ background: '#141623', mt: 2, ml: -2 }} elevation={0}>
          <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
            <Typography variant='h5' component='div' sx={{ color: 'white', flexShrink: 0 }}>
              My Job Preferences
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'white', textAlign: 'left', ml: 4 }}>
              {profiles && profiles.map((profile) => <DisplayProfile profile={profile} />)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}
