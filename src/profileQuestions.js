export function getQuestions() {
  let q = [
    {Characteristic: "Work Scheduling Autonomy", Notes: null, Position: 1, Prompt: "Work Scheduling Autonomy (Work scheduling autonomy means that you are able to determine when, and the order in which, you complete your work tasks without having to check in with a supervisor or coworkers.)" },
    {Characteristic: "Decision Making Autonomy", Notes: null, Position: 2, Prompt: "Decision Making Autonomy (Decision making autonomy means that you are able to make decisions about various aspects of your work without having to check in with a supervisor or coworkers.)" },
    {Characteristic: "Work Methods Autonomy", Notes: null, Position: 3, Prompt: "Work Methods Autonomy (Work methods autonomy means that you are able to choose the approach and methods you use for your work without having to check in with a supervisor or coworker.)" },
    {Characteristic: "Task Variety", Notes: null, Position: 4, Prompt: "Task Variety (Task variety means that the work you do involves a lot of different kinds tasks and activities, with relatively little time spent doing the same things over and over.)" },
    {Characteristic: "Task Significance", Notes: null, Position: 5, Prompt: "Task Significance (Task significance means that the work that you do has – or can have – an important direct or indirect impact on the lives of other people.)" },
    {Characteristic: "Task Identity", Notes: null, Position: 6, Prompt: "Task Identity (Task identity means that your work has an identifiable stating point, and ending point, so you know when you’ve ‘finished’ something.)" },
    {Characteristic: "Feedback from Job", Notes: null, Position: 7, Prompt: "Feedback from Job (Feedback from the job means that your work provides you with clear information relating to the quality and quantity of your job performance.)" },
    {Characteristic: "Job Complexity", Notes: null, Position: 8, Prompt: "Job Complexity (Job complexity means that your job requires you to work on multiple, often complicated, tasks simultaneously.)" },
    {Characteristic: "Information Processing", Notes: null, Position: 9, Prompt: "Information Processing (Information processing means that your job requires you to keep track of and analyze a large amount of information in order to complete your work.)" },
    {Characteristic: "Problem Solving", Notes: null, Position: 10, Prompt: "Problem Solving (Problem solving means that your job requires you be creative in finding solutions to problems with no conspicuous or obvious answer.)" },
    {Characteristic: "Skill Variety", Notes: null, Position: 11, Prompt: "Skill Variety (Skill variety means that your job requires you to use a range of different or high-level skills to complete your work tasks.)" },
    {Characteristic: "Specialization", Notes: null, Position: 12, Prompt: "Specialization (Specialization means that your job requires you to have well-developed knowledge, and a focused set of skills, in order to complete your work.)" },
    {Characteristic: "Social Support", Notes: null, Position: 13, Prompt: "Social Support (Social support means that your job provides you with the opportunity to develop meaningful personal connections with your coworkers.)" },
    {Characteristic: "Initiated Interdependence", Notes: null, Position: 14, Prompt: "Initiated Interdependence (Initiated interdependence means that for others to complete their work, including coworkers, depends on you getting your work done first.)" },
    {Characteristic: "Received Interdependence", Notes: null, Position: 15, Prompt: "Received Interdependence (Received interdependence means that in order for you to complete your work that others, including coworkers, must complete their work first.)" },
    {Characteristic: "Interaction Outside Research Group", Notes: null, Position: 16, Prompt: "Interaction Outside Research Group (Interaction outside the research group means that your job requires you to have frequent interactions and communication with people outside of your team or group in order to complete your work.)" },
    {Characteristic: "Feedback from Others", Notes: null, Position: 17, Prompt: "Feedback from Others (Feedback from others means that, while on the job, coworkers and supervisors provide you with useful information about your work performance.)" },
    {Characteristic: "*Faculty/project leader feedback", Notes: null, Position: 18, Prompt: "*Faculty/project leader feedback (Faculty/project leader feedback means that, while on the job, your faculty/project leader provides you with useful information about your work performance.)" },
    {Characteristic: "*Peer Feedback", Notes: null, Position: 19, Prompt: "*Peer Feedback (Peer feedback means that, while on the job, your peers provide you with useful information about your work performance.)" },
    {Characteristic: "Ergonomics", Notes: null, Position: 20, Prompt: "Ergonomics (Ergonomics means that the physical configuration of your work space is generally comfortable, can accommodate a range of different body types, and doesn’t contribute to physical strain or discomfort.)" },
    {Characteristic: "Physical Demands", Notes: null, Position: 21, Prompt: "Physical Demands (Physical demands means that, while on the job, a great deal of physical effort is necessary to complete your work tasks.)" },
    {Characteristic: "Work Conditions", Notes: null, Position: 22, Prompt: "Work Conditions (Work conditions means that the physical setting where you do your job tasks is generally free from uncomfortable or dangerous conditions.)" },
    {Characteristic: "Equipment Use", Notes: null, Position: 23, Prompt: "Equipment Use (Equipment use means that, while on the job, your work requires you to use a number of different kinds of equipment to complete your work tasks.)" }
  ];
  return q;
}

export function getAnswers(position) {
  let a = [{
    Position: position,
    ResponsePrompt: "Don't want to answer",
    ResponseValue: 0,
    SurveyID: position
  }, 
  {
    Position: position,
    ResponsePrompt: "1",
    ResponseValue: 1,
    SurveyID: position
  }, 
  {
    Position: position,
    ResponsePrompt: "2",
    ResponseValue: 2,
    SurveyID: position
  }, 
  {
    Position: position,
    ResponsePrompt: "3",
    ResponseValue: 3,
    SurveyID: position
  }, 
  {
    Position: position,
    ResponsePrompt: "4",
    ResponseValue: 4,
    SurveyID: position
  }, 
  {
    Position: position,
    ResponsePrompt: "5",
    ResponseValue: 5,
    SurveyID: position
  }, 
  {
    Position: position,
    ResponsePrompt: "6",
    ResponseValue: 6,
    SurveyID: position
  }, 
  {
    Position: position,
    ResponsePrompt: "7",
    ResponseValue: 7,
    SurveyID: position
  }];
  return a;
}