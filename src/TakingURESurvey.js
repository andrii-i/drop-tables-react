import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import axios from 'axios';

function DisplayQuestionOption({questionOpt}){
  return (
    <div>
      -> {questionOpt.Prompt}
      {questionOpt.responses.map(x => <li>{x.ResponsePrompt}</li>)}
    </div>
  )
}

export default function TakingURESurvey() {
  const [responseOptions, setOptions] = useState();
  const [questions, setQuestions] = useState();
  const [questionOptions, setQOptions] = useState();
  const surveyId = 1;
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/get_response_options/${surveyId}`).then((data) => setOptions(data.data));
    axios.get(`http://127.0.0.1:5000/get_survey_questions/${surveyId}`).then((data) => setQuestions(data.data));
  }, [])
  console.log(questionOptions);

  useEffect(() => {
    if(questions && responseOptions){
      // let temp = [... new Set(questions.map(x => x.Position))]
      let questionResponses = []
      let lastPosition = 1;
      for (var i = 0; i < questions.length; i++) {
        let question = questions[i];
        let responses = responseOptions.filter((x) => x.Position == question.Position);
        if(responses.length == 0){
          responses = responseOptions.filter((x) => x.Position == lastPosition);
        }
        else{
          lastPosition = question.Position;
        }
        questionResponses.push({
          ...question, responses: responses
        });
        
      }
      setQOptions(questionResponses);

    }
  }, [questions])
  return (
    <Box className='container-center-horizontal' sx={{height: '100vh'}}>
      <NavBar />
      <div style={{color: "white"}}>
        This is take URE survey
        {/* {questions && questions.map((response) => <div style={{color:"white"}}>Question {response.Prompt}</div>)}
        {responseOptions && responseOptions.map((response) => <div style={{color:"white"}}>Response {response.ResponsePrompt}</div>)} */}
        {questionOptions && questionOptions.map(x => <DisplayQuestionOption questionOpt={x}></DisplayQuestionOption>)}

      </div>
    </Box>
  );
}