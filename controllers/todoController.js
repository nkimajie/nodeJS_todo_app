let bodyParser = require('body-parser');
let mysql = require('mysql');

let mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node"
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeded');
    else
    console.log('DB connection error');
});


let urlencodedParser =  bodyParser.urlencoded({ extended: false });

// let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

// let data = mysqlConnection.query('SELECT * FROM todo');

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        mysqlConnection.query('SELECT * FROM todo', (err, rows, fields)=>{
            if(!err)
                // console.log(rows);
                res.render('todo', {todos: rows});
            else
                console.log(err);
            
        });
        
    });

    app.post('/todo', urlencodedParser, function(req, res){
        const {item} = req.body;
        // console.log(req.body.item);

        mysqlConnection.query('INSERT INTO todo SET ?', {todo_item : item}, (err, rows, fields)=>{
            if(!err)
            res.redirect('/todo');
            else
            console.log(err);   
        })
        // data.push(req.body);
        // res.json(data);

    });

    app.get('/todo/:id', function(req, res){

        var id= req.params.id;
        console.log(id);
        mysqlConnection.query('DELETE FROM todo WHERE id = ?',[req.params.id], (err, rows, fields)=>{
            if(err){
                console.log(err);
                res.sendStatus(500).json(
                    {
                        err,
                        message: 'Not deleted'
                    }
                )
            }
            
            else{
                res.redirect('/todo');
            }
             
        })
        // res.json(data);
    });

};