const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8080;

// const myRouter = express.Router

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "server is up and running"})
})


try {
    // const DB_URI = "mongodb+srv://samuelowase02:7gOv8GanKrTylyo3@cluster0.c7ltd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    mongoose.connect(process.env.DB_URI)
    console.log("connected to database")
    
} catch (error) {
    console.log("Failed to connect to database" + error);
    
}

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    AdminNo:{
        type: String,
        unique: true
    },
    age:{
        type:String
    },
    gender:{
        type:String
    },
    isfee:{
        type: Boolean
    }
})

const studentModel = mongoose.model("Students", studentSchema)

const getAllStudent =  async (req, res)=>{
    try {
        const getStudents = studentModel.find()
        return res.status(200).json({
            message: "Students found",
            data: getStudents,
            
            
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error Getting Students",
            data: error.message
        })
    }
}

// app.use("/api", myRouter.get("/getstudents", getAllStudent))

app.listen(PORT, ()=>console.log("Port:", PORT))