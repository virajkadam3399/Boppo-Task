const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors());
app.use(express.json());

// app.get('/',(req,res)=>{
//     res.send("Hello Express")
// })

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : '12345',
    database : "boppo_task"
})

app.get('/',(req,res)=>{
    const sql = 'SELECT * from users';
    db.query(sql, (err, result) =>{
        if(err) return res.json({message: 'Error inside server'});
        return res.json(result);
    })
})


app.post('/user' ,(req,res)=>{
    const sql = "INSERT INTO users (FirstName, LastName, Age, Email, ContactNo) VALUES (?)";
    console.log(req.body)
    const values = [
        req.body.FirstName,
        req.body.LastName,
        req.body.Age,
        req.body.Email,
        req.body.ContactNo
    ]

    db.query(sql, [values], (err, result) =>{
        if(err) return res.json(err);
        return res.json(result)
    })
})


app.get('/read/:id',(req,res)=>{
    const sql = "SELECT * FROM users WHERE SrNo = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result) =>{
        if(err) return res.json({message: 'Error inside server'});
        return res.json(result);
    })
})

app.put('/update/:id', (req,res)=>{
    const sql = "UPDATE users SET FirstName =?, LastName =?, Age =?, Email =?, ContactNo =? WHERE SrNo = ?";
    const id = req.params.id;

    db.query(sql, [req.body.FirstName, req.body.LastName, req.body.Age, req.body.Email, req.body.ContactNo, id], (err,result) => {
        if(err) return res.json({message: 'Error inside server'});
        return res.json(result);
    })
})


app.delete('/delete/:id', (req,res)=>{
    const sql = "DELETE FROM users WHERE SrNo =?";
    const id = req.params.id;

    db.query(sql, [id], (err,result) => {
        if(err) return res.json({message: 'Error inside server'});
        return res.json(result);
    })    
})


app.get('/',(req,res)=>{
    // const sqlInsert = "INSERT INTO users (FirstName, LastName, Age, Email, ContactNo) VALUES ('John', 'Doe', '20', 'john@gmail.com', '9834512345')";
    // db.query(sqlInsert, (error,result )=>{
    //     console.log('error', error);
    //     console.log('result', result);
    //     res.send('Hello Express Server')
    // })
})

app.listen(1122, ()=>{
    console.log('Server starting on port 1122')
})