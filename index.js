const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

const PORT= process.env.PORT || 5000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));

// Create call+API function
// API KEY - pk_e1a77b24867d49ef95420ddaf23bab2f
function call_api(stockCompany,finishedAPI){
request(`https://cloud.iexapis.com/stable/stock/${stockCompany}/quote?token=pk_e1a77b24867d49ef95420ddaf23bab2f`,
    {json:true},(err,res,body)=>{
    if(err){
        console.log(err);
    } 
    if(res.statusCode === 200){  
        finishedAPI(body);
    }
});
};

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set handle bar routes
app.get('/', (req, res) => {
    let stockCompany = 'fb';
    call_api(stockCompany,function(doneAPI){
        //console.log(doneAPI);
        res.render('home', {
            stock:doneAPI
        });
    });
    
});

// Set handle bar index post route
app.post('/', (req, res) => {
    let stockCompany = req.body.stock_ticker;
    call_api(stockCompany,function(doneAPI){
        //console.log(doneAPI);
        res.render('home', {
            stock:doneAPI
        });
    });
});

// set handle bar route for home index
app.get('/index', (req, res) => {
    res.render('index', {
        stock:"Some additional Stuff here!!"
    });
});

// set handle bar for about page

app.get('/about', (req, res) => {
    res.render('about', {
        stuff:"Some additional Stuff here!!"
    });
});

// For static webpage
//app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});