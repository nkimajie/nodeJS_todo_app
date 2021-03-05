let express = require('express');
// let bodyParser = require('body-parser');
let todoController = require('./controllers/todoController');

let app = express();

// let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use(express.static('./public')); 

//fire controllers
todoController(app);


app.listen(3000);
console.log('you are listening to port 3000');