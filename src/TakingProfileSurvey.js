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
import TextField from '@mui/material/TextField';
import { useAuth } from "./contexts/authContext";
import { getAnswers, getQuestions } from "./profileQuestions";
import { useNavigate } from "react-router-dom";


function DisplayQuestionOption({questionOpt, setAnswers, setImportances}){
  const [value, setValue] = useState();
  const [impValue, setImpValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
    setAnswers(prev => prev.map(x => {
      if(x.index === questionOpt.Position-1){
        return {...x, answer: parseInt(event.target.value)}
      }
      return x;
    }))
  };

  const handleChange2 = (event) => {
    setImpValue(event.target.value);
    setImportances(prev => prev.map(x => {
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
        <FormLabel id="value" sx={{color: 'black', fontSize: '25px', mt: 2, mb: 2}}>Value:</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value ? value : 0}
          onChange={handleChange}
          sx={{ mb: 5 }}
        >
          {questionOpt.responses.map(x => 
            <FormControlLabel value={x.ResponseValue} control={<Radio />} label={x.ResponsePrompt} sx={{color: 'black', ml: 5}} />)}
        </RadioGroup>
        <FormLabel id="importance" sx={{color: 'black', fontSize: '25px', mt: 2, mb: 2}}>Importance:</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={impValue ? impValue : 0}
          onChange={handleChange2}
          sx={{ mb: 5 }}
        >
          {questionOpt.responses.map(x => 
            <FormControlLabel value={x.ResponseValue} control={<Radio />} label={x.ResponsePrompt} sx={{color: 'black', ml: 5}} />)}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default function TakingProfileSurvey() {
  const { currentUser } = useAuth();
  const [responseOptions, setOptions] = useState();
  const [questions, setQuestions] = useState();
  const [questionOptions, setQOptions] = useState();
  const [questionAnswers, setAnswers] = useState();
  const [questionImportances, setImportances] = useState();
  const [profileName, setProfileName] = useState();
  const navigate = useNavigate();

  // console.log(questionAnswers);
  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  useEffect(() => {
    if (questions) {
      // console.log(questions);
      let qOptions = [];
      for(let i = 0; i < questions.length; i++){
        qOptions = [...qOptions, ...getAnswers(i+1)];
      }
      // console.log(qOptions);
      setOptions(qOptions);
    }
  }, [questions])

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
      let numQuestions = questions.length
      setAnswers(Array(numQuestions).fill(0).map((val, index) => {return {index: index, answer: 0}}))
      setImportances(Array(numQuestions).fill(0).map((val, index) => {return {index: index, answer: 0}}))
    }
  }, [questions, responseOptions])

  const handleChange = (event) => {
    setProfileName(event.target.value);
  };

  const handleSubmit = () => {
    axios.post(`http://127.0.0.1:5000/post_desired_profile`, 
    {
      answers: questionAnswers,
      importances: questionImportances,
      email: currentUser.multiFactor.user.email,
      name: profileName
    });
    navigate('/surveys');
  };

  return (
    <Box className='container-center-horizontal' sx={{minHeight: '100vh'}}>
      <NavBar />
      <div style={{color: "white"}}>
        Job Preferences Profile Survey
        <Box sx={{ width: '60%', ml: 'auto', mr: 'auto', mt: 2, bgcolor: 'background.paper', textAlign: 'left'}}>
          <FormControl sx={{ml: 5}}>
            <FormLabel id="radio-buttons-group" sx={{color: 'black', fontSize: '25px', mt: 2, mb: 2}}>Name of this Job Preferences Profile:</FormLabel>
            <TextField
                onChange={handleChange}
                id="firstname"
                sx={{ width: '50vh', ml: 12, mb: 3}}
              />
          </FormControl>
        </Box>
        {questionOptions && questionOptions.map(x => <DisplayQuestionOption setAnswers={setAnswers} setImportances={setImportances} questionOpt={x}></DisplayQuestionOption>)}
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