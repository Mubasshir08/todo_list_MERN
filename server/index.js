const express = require('express');
const bodyParser = require('body-parser');
const getClientIp = require("get-client-ip");
const cors = require('cors');

// connect to db
const dbConfig = require('./config/db.js');

// import models
const toDoModel = require('./models/tasks.js');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Use middleware to enable CORS
app.use(cors( {
    origin: ["https://normal-todo-list.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));


app.get('/', (req,res)=> {
    res.send('server run successfully')
})

app.get('/tasks' , async (req,res) => {
    const tasks = await toDoModel.find({clientIp : getClientIp(req)});
    res.send(tasks);
});

app.post('/createTask' , async (req,res) => {
    const createTask = await new toDoModel({
        taskName : req.body.task,
        clientIp : getClientIp(req)
}); 
    await createTask.save();
    res.send(createTask);
});

app.post('/deleteTask' , async (req,res) => {
    const deletedTask = await toDoModel.findByIdAndDelete(req.body.id);
    const tasks = await toDoModel.find();
    res.send(tasks);
});

app.post('/updateTask' , async (req,res) => {
    const updateTask = await toDoModel.findByIdAndUpdate(req.body.id, {taskName : req.body.task}, { new: true });
    const task = await toDoModel.find();
    res.send(task);
});

app.listen('3000');