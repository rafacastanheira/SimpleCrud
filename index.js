const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?teste=1
// Route params = /users/1
// Request body = {"name": "rafael", "email": "rafael@hotmail.com"}

const projects = [
    
];

let count = 0; //contagem de requisições


//Middleware global para log de requisição
server.use((req,res,next) => {   

    next();
    count++;
    console.log(`Quantidade de Requisições: ${count}`);

})


//Middleware de checagem de projeto pelo id
function checkProjectsInArray (req,res,next){
    const {id} = req.params;    
    const index = projects.findIndex(projeto => projeto.id === id);
    if(!projects[index]){
        return res.status(400).json({erro: "Project does not exists"});
    }
    
    req.project = projects[index];
   
       

    return next();
}


server.get('/projects', (req,res) => {
        return res.json(projects);
})


server.put('/projects/:id', checkProjectsInArray, (req,res) => {    
    const {title} = req.body;   
    
    req.project.title = title; 

    return res.json(projects);

    
})

server.delete('/projects/:id', checkProjectsInArray, (req,res) => {
    index = projects.indexOf(req.project);

    projects.splice(index, 1);

    return res.json(projects);
    
})




server.post('/projects', (req,res) => {
    const{id} = req.body;
    const{title} = req.body;
    
    projects.push({
        id: id,
        title: title,
        tasks: []
    })      

    return res.json(projects);
})

//Post de tarefas no projeto utilizando id
server.post('/projects/:id/tasks', checkProjectsInArray, (req,res) => {
    const{title} = req.body;    
    
    req.project.tasks.push(title);

    return res.json(projects);
})

server.listen(3000);