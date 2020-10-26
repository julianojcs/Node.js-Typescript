const express = require('express');
const app = express();

app.use(express.json());

const { uuid } = require('uuidv4') //npm install uuidv4
const projects = [];

app.get('/projects', (request, response) => {
    return response.json(projects);
})

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    const id = uuid();
    const project = {
        id,
        title,
        owner
    };
    projects.push(project);
    return response.json(project);
})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({error: 'Project not found!'});
    }

    const project = {
        id,
        title: title===undefined ? projects[projectIndex].title : title,
        owner: owner===undefined ? projects[projectIndex].owner : owner
    };
    projects[projectIndex] = project;

    return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({error: `Cannot DELETE Project ${id}! `+`Project not found`});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).json([]);
})

app.listen(3333, () => {
    console.log('Server up!')
});