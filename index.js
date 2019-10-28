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
        res.status(500).json({error:"failed to get users from db"})
    })
})


//GET by ID
server.get("/api/users/:id", (req,res) => {
    const id = req.params.id;
    db.findById(id)
    .then(userId => {
        res.status(200).json(userId)
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({error:"failed to get user from db"})
    })
})

//POST req

server.post("/api/users", (req,res) => {
    const userInfo = req.body;

    db.insert(userInfo)
    .then(id => {
        res.status(201).json(id)
    } )
    .catch(err => {
        console.log("error", err)
        res.status(500).json({error:"failed to add user from db"})
    })
})


//PUT req

server.put("/api/users/:id", (req,res) => {
    const newInfo = req.body;
    const oldUser = req.params.id
    db.update(oldUser,newInfo)
    .then( count => {
        res.status(201).json(count)
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
        res.status(200).json(gone)
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({error:"failed to delete user from db"})
    })
})




//listen for request on specfic port on localhost
const port = 5000;
server.listen(port, () => console.log(`/n=== API on port 5000 ===/n`))