import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import axios from 'axios';

export default function TakeWorkSurvey() {
  const [responseOptions, setOptions] = useState();
  const surveyId = 2;
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/get_response_options/${surveyId}`).then((data) => setOptions(data.data));
  }, [])
  return (
    <Box className='container-center-horizontal' sx={{height: '100vh'}}>
    <NavBar />
    <div style={{color: "white"}}>
      Take Work Survey
    </div>
    {responseOptions && responseOptions.map((response) => <div style={{color:"white"}}>{response.Position}</div>)}
  </Box>
  )
}
