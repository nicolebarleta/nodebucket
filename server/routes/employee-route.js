/**
; Title:  employee-route.js
; Author: Professor Krasso
; Date: 23 March 2021
; Modified By: Marie Nicole Barleta
; Description: This is the routing for the API
; Added post request for update tasks
 */

//Required statements for routing API
const express = require('express');
const Employee = require("../db-models/employee");
const BaseResponse = require('../service/base-response');
const { $ } = require('protractor');
const { isNull } = require('util');
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
/**
 * API: createTask
 * Post request to update MongoDb collections,
 * this one updates the arrays of tasks.
 */
router.post('/:empId/tasks', async(req, res) => {

    try {
        //Gets the employee Id to be able to update the employee's task
        Employee.findOne({'empId': req.params.empId}, function(err, employee) {
            
            /**
             * If the error doesn't occur it will get the text as an object
             * and the todo item will be pushed into the array in the schema and will be saved, 
             * after that it go through another process to make sure if it successfully saved,
             * if everything worked in updated employee a successful query will be show.
             */

            if (err)
            {
    
                console.log(err)

                const createTaskMongoDbError = new BaseResponse('500', `MongoDB Exception: ${err.message}`, null)
                
                res.status(500).send(createTaskMongoDbError.toObject());

            } else {
                console.log(employee);

                const item = {
                    text: req.body.text
                };

                employee.todo.push(item);

                employee.save(function(err, updatedEmployee){

                    if (err) 
                    {
                        
                        console.log(err);
                        
                        const createTaskOnSaveMongoDbError = new BaseResponse('500', `MongoDB onSave() exception: ${err.message}`, null)

                        res.status(500).send(createTaskOnSaveMongoDbError.toObject());
                    } else {
                        console.log(updatedEmployee);

                        const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful query', updatedEmployee);

                        res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
                    }
                })
            }
        })
    //Catching the error if the server is not working
    } catch (e) {
        console.log(e);

        const createTaskCatchException = new BaseResponse('500', `Internal Server Error: ${e.message}`, null)

        res.json(createTaskCatchException.toObject());
    } 
})


//Export routing statement
module.exports = router;