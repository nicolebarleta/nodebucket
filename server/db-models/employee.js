/**
; Title:  employee.js
; Author: Professor Krasso
; Date: 21 March 2021
; Modified By: Marie Nicole Barleta
; Description: Database model schema 
; This employeeSchema let's the API connect to MongoDB's database
 */

//declaration of mongoose requirement
const mongoose = require('mongoose');
//declaration of schema
let employeeSchema = mongoose.Schema({
    //the empId is the object inserted in MongoDB
    empId: { type: String, unique: true }
    //the collection name in MongoDB where the objects are inserted
}, {collection: "employees"});
//export statement for employeeSchema
module.exports = mongoose.model("Employee", employeeSchema);