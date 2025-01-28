import express from "express"
import {faker} from "@faker-js/faker"
import {PORT} from "./constants.js";
import {ObjectivesController} from "./controller/objectives.controller.js";
import {ObjectivesServices} from "./service/objectives.services.js";

const app = express();

const objectiveService = new ObjectivesServices();
const objectives = new ObjectivesController(objectiveService);

app.get("/objectives",(req,res)=>{
    res.json(objectives.fetchAll())
})

app.get('/',(req,res)=>{
    return " hello parth"
})

app.listen(PORT, ()=>{
    console.log('listening on port: ', PORT)
})