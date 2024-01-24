const express = require('express');
const axios = require('axios');
const ejs = require("ejs");
const bodyParser = require("body-parser");



const app = express();
const port = 5000;


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs'); 

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/location.html");
});

// Route to fetch and convert API data to an object
/*app.get('/', async (req, res) => {
  
    // Fetch data from the API
    const response = await axios.get(apiUrl);
    const temp = response.data.current.temp_c;
    hum = response.data.current;
    loc = response.data.location.country;
    city = response.data.location.name;
    console.log(hum);

    const humArray = Object.entries(hum);
    
    
    // Render home.ejs with fetched data
    res.render("home", { temp, humArray, loc, city });
  });*/

app.post('/', async (req, res)=>{
    const cN = req.body.cityName;
    console.log(cN);
    const apiUrl = "http://api.weatherapi.com/v1/current.json?key=531b0e3309144c198b1170416230412&q=new%20"+cN+"&aqi=no";
    // Fetch data from the API
    const response = await axios.get(apiUrl);
    const temp = response.data.current.temp_c;
    hum = response.data.current;
    loc = response.data.location.country;
    city = response.data.location.name;
    //console.log(response.data);
    console.log(loc, city);

    const humArray = Object.entries(hum);
    
    
    // Render home.ejs with fetched data
    res.render("home", { temp, humArray, loc, city });
});

   
 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

