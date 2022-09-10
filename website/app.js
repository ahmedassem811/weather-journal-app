
// Personal API Key for OpenWeatherMap API
const apiKey = 'd6e58210234249c5d8708dfb4cb2ad3d&units=imperial';

/* Global Variables */
const generateBtn= document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Fetch the data from the api request after clicking on the generate btn and save response variable
then parse it to json and view it in the console */

//Adds an event listener to an existing HTML button from DOM using Vanilla JS.
generateBtn.addEventListener('click', async()=> {

    const zipCode= document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    
    //Check if user doesn't enter any data in the fields
    if(!zipCode || !content){
        alert("You must enter all data!")
        return
    }
    //Using promise&then chaining to get the data.
    getTodayTemp(zipCode)
    .then((todayTemp)=>{
        postData(todayTemp,content)
    })
    .then (()=>{
        return getData()
    }) 
    .then((result)=>{
        updateUI(result)
    })
    .catch((err) => {
        console.log("Error is :",err)
    })

})

//To get temperture data from the endpoint
async function getTodayTemp(zipCode){
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`
    let res = await fetch(url);
    let trgtData =  await res.json()
    let todayTemp = trgtData.main.temp

    return todayTemp
}

//The POST client side function that take two arguments, the URL to make a POST, and an object holding the data to POST.
async function postData(temp,content){
    await fetch ('/reqData', {
        method : "POST",
        credentials : "same-origin",
        headers : {
            'Content-Type':'application/json'
        },
       body : JSON.stringify({
            date : newDate,
            temp : temp,
            content : content
       })
    });
}

//The GET method that fetch the data from the app endpoint
async function getData(){
    const response = await fetch ('/getReqData');
    const result = await response.json();
    console.log ("Entered Data :",result)
    return result
}

//Function recieved the response from get method and update UI with data 
function updateUI (result){
    try {
    console.log(result)

    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(result.temp)+ 'degrees';
    document.getElementById('content').innerHTML = result.content;
    document.getElementById('date').innerHTML =result.date;
    }
    
    // appropriately handle the error
    catch(error) {
      console.log("error", error);
    }
}
 
