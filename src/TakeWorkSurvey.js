import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import axios from 'axios';

export default function TakeWorkSurvey() {
    const [responseOptions, setOptions] = useState();
    const [questions, setQuestions] = useState()
    const [questionOptions, setQOptions] = useState()
    const surveyId = 2;
    useEffect(() => {
      axios.get(`http://127.0.0.1:5000/get_response_options/${surveyId}`).then((data) => setOptions(data.data));
      axios.get(`http://127.0.0.1:5000/get_survey_questions/${surveyId}`).then((data) => setQuestions(data.data));
    }, []);
    console.log(questionOptions);
    console.log(responseOptions)

    useEffect(() => {
      if(responseOptions && questions){
        // setQOptions(responseOptions.map((respOpt) => {return {...respOpt, question: questions[respOpt.Position].Prompt}}))
        setQOptions(questions.map((question) => {return {...question, respPrompts: responseOptions.filter((x) => x.Position == question.Position)}}))
      }
    }, [questions])
    return (
      <Box className='container-center-horizontal' sx={{height: '100vh'}}>
        <NavBar />
        <div style={{color: "white"}}>
          This is take Work survey
          {questions && questions.map((response) => <div style={{color:"white"}}>Question - {response.Prompt}</div>)}
        {responseOptions && responseOptions.map((response) => <div style={{color:"white"}}>Response - {response.ResponsePrompt}</div>)}
        </div>
      </Box>
    );
  }