import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

function DisplayQuestionOption({questionOpt}){
  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ width: '60%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper', textAlign: 'left'}}>
      <FormControl sx={{ml: 5}}>
        <FormLabel id="radio-buttons-group" sx={{color: 'black', fontSize: '25px', mt: 2, mb: 2}}>{questionOpt.Position}. {questionOpt.Prompt}</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          sx={{ mb: 5 }}
        >
          {questionOpt.responses.map(x => 
            <FormControlLabel value={x.ResponsePrompt} control={<Radio />} label={x.ResponsePrompt} sx={{color: 'black', ml: 5}} />)}
        </RadioGroup>
      </FormControl>
    </Box>
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
        let responses = responseOptions.filter((x) => x.Position === question.Position);
        if(responses.length === 0){
          responses = responseOptions.filter((x) => x.Position === lastPosition);
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
    <Box className='container-center-horizontal' sx={{minHeight: '100vh'}}>
      <NavBar />
      <div style={{color: "white"}}>
        URE survey
        {/* {questions && questions.map((response) => <div style={{color:"white"}}>Question {response.Prompt}</div>)}
        {responseOptions && responseOptions.map((response) => <div style={{color:"white"}}>Response {response.ResponsePrompt}</div>)} */}
        {questionOptions && questionOptions.map(x => <DisplayQuestionOption questionOpt={x}></DisplayQuestionOption>)}
      </div>
      <Button
        variant='contained'
        // onClick={handleSubmit}
        sx={{ mt: 5, backgroundColor: '#00966b', fontWeight: 'bold' }}
      >
        Submit Survey
      </Button>
    </Box>
  );
}