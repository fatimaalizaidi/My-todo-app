var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer= require("multer");



var app=Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://fatimaalizaidi:karachipakistan@cluster1.2ool5px.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";









var DATABASENAME="mytodoapp";
var database;

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    });




})


app.get('/api/mytodoapp/GetNotes',(request,response)=>{
    database.collection("mytodoappcollection").find({}).toArray((error,result)=>{
        response.send(result)
    });
})


app.post('/api/mytodoapp/AddNotes' , multer().none(),(request,response)=>{
    database.collection('mytodoappcolllection').count({},function(error,numOfDocs){
        database.collection("mytodoappcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully!");

    })
})


app.delete('/api/mytodoapp/DeleteNotes',(request,response) =>{
    database.collection('mytodoappcollection').deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})












