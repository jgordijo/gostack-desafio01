const express = require ('express');

const server = express();

server.use(express.json());

const projects = [];

server.use((req, res, next) => {
    
    console.count('Requisições efetuadas');

    next();
    
});

function checkIdExists(req, res, next) {
    
    const { id } = req.params;
    
    const project = projects.find(project => project.id == id);
    
    if(!id) {
        return res.status(400).json({ error: 'ID does not exists' });
    }

    return next();
}

server.get('/projects', (req, res) => {
    
    return res.json(projects);

});

server.post('/projects', (req, res) => { 
    const { id, title } = req.body;
    
    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);

    return res.json(project);
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    const project = projects.find(project => project.id == id);

    project.tasks.push(task);

    return res.json(project);

})

server.put('/projects/:id', checkIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(project => project.id == id);

    project.title = title;

    return res.json(project)
    
});

server.delete('/projects/:id/', checkIdExists, (req, res) => {  
    const { id } = req.params;
    
    projects.splice(id, 1)

    return res.json(projects);

});

server.listen(3000);