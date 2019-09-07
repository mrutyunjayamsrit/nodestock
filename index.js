const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

const PORT= process.env.PORT || 5000;



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {
        stuff:"Some additional Stuff here!!"
    });
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});