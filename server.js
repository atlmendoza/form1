// Step 3: Require/Loads the express module
const express = require('express');
// body-parser is used to read data payload from the http request body
const bodyParser = require('body-parser'); 
//  path is used to set default directories for MVC and also for the static files
const path = require('path'); 
// include the defined package


// Step 4: Creates our express server
const app = express();

//Serves static files inside the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route index.hbs when website initially starts and when home is clicked from the nav bar or whenever a process needs to go back to home 
app.get('/process', (req, res) => {
    const formData = req.query;
    formData.gender = determineGender(formData.gender);
    formData.talent = determineTalent(formData.talent);
    res.render('pages/acceptFormData.hbs', {formData});
})

// determine the gender description based on code
function determineGender(gender) {
  let dGender="";
  if (gender == "f")
       dGender = "Female"
  else if (gender=="m")
     dGender = "Male"
  else
     dGender = "Prefer Not to Say"
  return dGender 
}

// determine the talent description based on code
function determineTalent(talents) {
  for (let i in talents) {
    console.log(talents[i])
    if (talents[i] == 'd')
      talents[i] = "Dance"
    else if (talents[i] == 's')
      talents[i] = "Sing"
    else
      talents[i] = "Play Instruments"
  }
  console.log(talents)
  return talents 
}


// Step 5: Start HTTP Server on a port number 3000
// This will create a web service for your own project
const port = 3000;
app.listen(port, () => console.log(`App listening to port ${port}`));