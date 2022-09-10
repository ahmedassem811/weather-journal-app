// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server


const port = 8000;
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

/*GET route setup on the server side with the first argument as a string naming the route, 
and the second argument a callback function to return the JS object created at the top of server code.*/
app.get('/getReqData', (req , res) => {
    res.send(projectData);
})

/*POST route setup on the server side with the first argument as a string naming the route, 
and the second argument a callback function to add the data that sent in the body to the JS object created at the top of server code.*/
app.post('/reqData' , (req,res) =>{
    projectData = { ...req.body}
    res.send()
})

const server = app.listen(port, listening);
