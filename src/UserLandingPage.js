import React, {useState} from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

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

export default function UserLandingPage() {
  return (
    <Box className='container-center-horizontal' sx={{height: '100vh'}}>
      <NavBar />
      <Box sx={{ maxWidth: '80%', ml: 'auto', mr: 'auto', mt: 10 }}>
        <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left' }}>
          ONet Job Matching
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left', mt: 3 }}>
          ONet Job Search
        </Typography>
        <Link href='/surveys' style={{ textDecoration: 'none' }}>
          <Typography variant="h5" component="div" sx={{ color: 'white', textAlign: 'left', mt: 3 }}>
            Take A Survey
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
              This is where the surveys the user has taken will be displayed
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
              This is where the desired profiles the user has created will be displayed
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}
