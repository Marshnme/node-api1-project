// implement your API here

const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());



//route handlers



//GET req

server.get("/api/users", (req,res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({error:"The users information could not be retrieved."})
    })
})


//GET by ID
server.get("/api/users/:id", (req,res) => {
    const id = req.params.id;

    
    
        db.findById(id)
    .then(userId => {
        if(!userId){
            res.status(404).json({error:"The user with the specified ID does not exist."})
        }
        res.status(200).json(userId)
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({error:"The user information could not be retrieved."})
    })

    
    
        
    
    
        

    
})

//POST req

server.post("/api/users", (req,res) => {
    const {name, bio} = req.body;
    (!name || !bio)
    ? res
        .status(400).json({error:"Please provide name and bio for the user."})


    :db.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    } )
    .catch(err => {
        console.log("error", err)
        res.status(500).json({error:"There was an error while saving the user to the database"})
    })
})


//PUT req

server.put("/api/users/:id", (req,res) => {
    const {name,bio} = req.body;
    const oldUser = req.params.id;

    (!name || !bio)

    ?res 
    .status(400).json({error:"Please provide name and bio for the user."})


    :db.update(oldUser,req.body)
    .then( count => {
        if(!count){
            res.status(404).json({error:"The user with the specified ID does not exist."})
        }
        res.status(200).json(count)
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({error:"failed to update user from db"})
    })
})


//DELETE req

server.delete("/api/users/:id", (req,res) => {
    const user = req.params.id;

    db.remove(user)
    .then(gone => {
        if(!gone){
            res.status(404).json({error:"The user with the specified ID does not exist."})
        }
        res.status(200).json(gone)
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({error:"The user could not be removed"})
    })
})




//listen for request on specfic port on localhost
const port = 5000;
server.listen(port, () => console.log(`/n=== API on port 5000 ===/n`))