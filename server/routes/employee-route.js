/**
; Title:  employee-route.js
; Author: Professor Krasso
; Date: 21 March 2021
; Modified By: Marie Nicole Barleta
; Description: This is the routing for the API
 */

//Required statements for routing API
const express = require('express');
const Employee = require("../db-models/employee");
const BaseResponse = require('../service/base-response');
const { $ } = require('protractor');
//Express router statement
const router = express.Router();



/**
 * API: findEmployeeById
 */

 //Router gets the input employee ID
router.get('/:empId', async(req, res) => {
    //The routing goes here if the API connects to the MongoDB database successfully
    try
    {
        //Filter criteria to find the employee id 
        Employee.findOne({'empId': req.params.empId}, function(err, employee){
            //Statement for invalid employee id input it returns null
            if (err)
            {
                    console.log(err);

                    const mongoDBErrorResponse = new BaseResponse('500', 'MongoDB Native Error: $(err)', null);

                    res.json(mongoDBErrorResponse.toObject());

             }
             //Statement for valid employee id input it returns employee id string
            else
             {
                    console.log(employee);

                    const employeeResponse = new BaseResponse ('200', 'Successful query', employee);

                    res.json(employeeResponse.toObject());
            }
        })
    }
    //The routing goes here if the API doesn't go through MongoDB database 
    catch (e)
    {
        console.log(e);

        const findEmployeeCatchError = new BaseResponse('500', 'Internal Server Error: $(e.message}', null);

        res.json(findEmployeeCatchError.toObject());
       
    
    }
})




//Export routing statement
module.exports = router;