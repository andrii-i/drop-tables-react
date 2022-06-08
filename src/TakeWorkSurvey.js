import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAuth } from "./contexts/authContext";
import { useNavigate } from "react-router-dom";

function DisplayQuestionOption({questionOpt, setAnswers}){
  const [value, setValue] = useState();
  const handleChange = (event) => {
    setValue(event.target.value);
    setAnswers(prev => prev.map(x => {
      if(x.index === questionOpt.Position-1){
        return {...x, answer: parseInt(event.target.value)}
      }
      return x;
    }))
  };

  return (
    <Box sx={{ width: '60%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper', textAlign: 'left'}}>
      <FormControl sx={{ml: 5}}>
        <FormLabel id="radio-buttons-group" sx={{color: 'black', fontSize: '25px', mt: 2, mb: 2}}>{questionOpt.Position}. {questionOpt.Prompt}</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value ? value : 0}
          onChange={handleChange}
          sx={{ mb: 5 }}
        >
          {questionOpt.responses.length === 0 && 
          <TextField
            onChange={handleChange}
            id="firstname"
            sx={{ width: '50vh', ml: 12 }}
          />}
          {questionOpt.responses.map(x => 
            <FormControlLabel value={x.ResponseValue} control={<Radio />} label={x.ResponsePrompt} sx={{color: 'black', ml: 5}} />)}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default function TakeWorkSurvey() {
  const { currentUser } = useAuth();
  const [responseOptions, setOptions] = useState();
  const [questions, setQuestions] = useState();
  const [questionOptions, setQOptions] = useState();
  const [questionAnswers, setAnswers] = useState();
  const [responseOptions2, setOptions2] = useState();
  const navigate = useNavigate();
  const surveyId = 2;
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/get_response_options/${surveyId}`).then((data) => setOptions(data.data));
    axios.get(`http://127.0.0.1:5000/get_survey_questions/${surveyId}`).then((data) => setQuestions(data.data));
    axios.get(`http://127.0.0.1:5000/get_response_options/1`).then((data) => setOptions2(data.data));
  }, []);
  // console.log(questionOptions);
  // console.log(responseOptions);

  useEffect(() => {
    if(questions && responseOptions){
      // let temp = [... new Set(questions.map(x => x.Position))]
      let questionResponses = []
      // let lastPosition = 1;
      for (var i = 0; i < questions.length; i++) {
        let question = questions[i];
        let responses = responseOptions.filter((x) => x.Position === question.Position);
        if(i > 5){
          responses = responseOptions2.filter((x) => x.Position === 12);
        }
        questionResponses.push({
          ...question, responses: responses
        });
        
      }
      setQOptions(questionResponses);
      let numQuestions = questions.length
      setAnswers(Array(numQuestions).fill(0).map((val, index) => {return {index: index, answer: 0}}))

    }
  }, [questions]);

  const handleSubmit = () => {
    // console.log(questionAnswers);
    axios.post(`http://127.0.0.1:5000/post_work_response`, 
    {
      answers: questionAnswers,
      email: currentUser.multiFactor.user.email
    });
    navigate('/surveys');
  };

  return (
    <Box className='container-center-horizontal' sx={{minHeight: '100vh'}}>
      <NavBar />
      <div style={{color: "white"}}>
        Work Experience Survey
        {/* {questions && questions.map((response) => <div style={{color:"white"}}>Question - {response.Prompt}</div>)}
      {responseOptions && responseOptions.map((response) => <div style={{color:"white"}}>Response - {response.ResponsePrompt}</div>)} */}
      {questionOptions && questionOptions.map(x => <DisplayQuestionOption setAnswers={setAnswers} questionOpt={x}></DisplayQuestionOption>)}
      </div>
      <Button
        variant='contained'
        onClick={handleSubmit}
        sx={{ mt: 5, backgroundColor: '#00966b', fontWeight: 'bold' }}
      >
        Submit Survey
      </Button>
    </Box>
  );
}