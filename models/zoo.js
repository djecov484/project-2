const mongoose = require("./connection")

const {Schema, model} = mongoose

const animalsSchema = new Schema({
    name: String,
    extinct: Boolean, 
    location: String,
    life: Number, 
    img: String
 })
 
 const Animal = model("Animal", animalsSchema)

 module.exports = Animal