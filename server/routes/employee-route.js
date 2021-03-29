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
 * Post request to create a record on MongoDb collections,
 * this updates the arrays of employee id's todo task.
 */
router.post('/:empId/tasks', async(req, res) => {

    try {
        //Gets the employee Id to be able to update the employee's task
        Employee.findOne({'empId': req.params.empId}, function(err, employee) {
            
            /**
             * If the error doesn't occur it will get the text as an object
             * and the todo item will be pushed into the array in the schema and will be saved, 
             * after that it go through another process to make sure if it successfully saved,
             * if everything worked in updated employee a successful query will be shown.
             */

            if (err)
            {
    
                console.log(err)

                const createTaskMongoDbError = new BaseResponse('500', `MongoDB Exception: ${err.message}`, null)
                
                res.status(500).send(createTaskMongoDbError.toObject());

            } else {
                console.log(employee);
                
                if(employee)
                {
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
                } else {
                    console.log(`invalid employeeId`);

                    const invalidEmployeeIdResponse = new BaseResponse (`200`, `Invalid employeeId`, null)

                    res.status(200).send(invalidEmployeeIdResponse.toObject());
                }
         
            }
        })
    //Capturing error if the server is not working
    } catch (e) {
        console.log(e);

        const createTaskCatchException = new BaseResponse('500', `Internal Server Error: ${e.message}`, null)

        res.json(createTaskCatchException.toObject());
    } 
})

/**
 * API: findAllTasks
 * This API has a get request 
 * to retrieved all the tasks records of the employees,
 * all todo tasks and done tasks. 
 */
router.get(`/:empId/tasks`, async(req, res) => {

    /**
     * The Employee.findOne, 
     * a MongoDb function will get all the 
     * empId's todo and done tasks, 
     * if there are no errors.
     */

    try
    {
        Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {

            if (err)
            {
                console.log(err);

                const mongoDBFindAllTasksException = new BaseResponse('500', `Internal server error ${err.message}`, null);

                res.status(500).send(mongoDBFindAllTasksException.toObject());
            }
            else
            {
                console.log(employee);

                const employeeTaskResponse = new BaseResponse('200', `Query Successful`, employee);
                res.status(200).send(employeeTaskResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);

        const errorCatchResponse = new BaseResponse(`500`, `Internal server error ${e.message}`, null);

        res.status(500).send(errorCatchResponse.toObject());
    }
})

 /**
 * API: updateTasks
 * A put request is used to be able to update 
 * the done and todo tasks of an employee.
 */
router.put('/:empId/tasks', async(req, res) => {

    try
    {
        Employee.findOne({'empId': req.params.empId}, function (err, employee)
        {
            if (err)
            {
                console.log(err);

                const updateTaskMongodbException = new BaseResponse('500', `Internal server error ${err.message}`, null)

                res.status(500).send(updateTaskMongodbException.toObject());
            }
            else
            {
                /**
                 * If there was no error the specific employee's
                 * todo and done tasks will be set and saved.
                 * The updated employee will be shown afterwards.
                 */
                console.log(employee);

                if (employee)
                {
                    employee.set({
                        todo: req.body.todo,
                        done: req.body.done
                    });

                    employee.save(function(err, updatedEmployee){
                        if (err)
                        {
                            console.log(err);

                            const updateTaskMongoDbError = new BaseResponse('500', `Internal server error ${err.message}`, null);

                            res.status(500).send(updateTaskMongoDbError.toObject());
 
                        }
                        else
                        {
                            console.log(updatedEmployee);

                            const updatedTaskSuccessResponse = new BaseResponse('200', `Query successful`, updatedEmployee)

                            res.status(200).send(updatedTaskSuccessResponse.toObject());
                        }
                    })

                }
                //This is the error handling for invalid employee id input
                else
                {
                    console.log(`Invalid employeeId! The passed-in value was ${req.params.empId}`);

                    const invalidEmployeeIdResponse = new BaseResponse('200', 'Invalid employeeId', null)

                    res.status(200).send(invalidEmployeeIdResponse.toObject());
                }
            }
        })
    }
    catch (e)
    {
        console.log(e);

        const updateTaskCatchResponse = new BaseResponse('500', `Internal server error ${e.message}`, null);

        res.status(500).send(updateTaskCatchResponse.toObject());
    }
})
 /**
 * API: deleteTask
 * Delete request to delete a specific task 
 * in a specific employee id.
 */
router.delete('/:empId/tasks/:taskId', async(req, res) => {

    try
    {
        Employee.findOne({'empId': req.params.empId}, function(err, employee)
        {
            if(err)
            {
                console.log(err);

                const deleteTaskMongoDbError = new BaseResponse('500', `Internal server error ${err.message}`, null);

                res.status(500).send(deleteTaskCatchError.toObject());
            }
            else
            {
                console.log(employee);
                /**
                 * the todoItem variable will find the declared employee ID's todo task id
                 * and will turn it into a string and it is compared to the declared todo task id,
                 * and verify they are equal.
                 */
                const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
                /**
                 * the doneItem variable will find the declared employee ID's done task id
                 * and will turn it into a string and it is compared to the declared done task id,
                 * and verify they are equal.
                 */
                const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);


                /**
                 * If there is no error the todoItem id that was received 
                 * will be removed from the collections and will be saved,
                 * the updated employee todo item records will be shown afterwards. 
                 */
                if (todoItem)
                {
                    console.log(todoItem);

                    employee.todo.id(todoItem._id).remove();

                    employee.save(function(err, updatedTodoItemEmployee){
                        if(err)
                        {
                            console.log(err);
                            const deleteTodoItemMongodbError = new BaseResponse('500', `Internal server error ${err.message}`, null);
                            res.status(500).send(deleteTodoItemMongodbError.toObject());
                        }
                        else
                        {
                            console.log(updatedTodoItemEmployee);

                            const deleteTodoItemSuccess = new BaseResponse('200', 'Query Successful', updatedTodoItemEmployee)
                            res.status(200).send(deleteTodoItemSuccess.toObject());
                        }
                    })
                }
                /**
                 * If there is no error the doneItem id that was received 
                 * will be removed from the collections and will be saved,
                 * the updated employee done item records will be shown afterwards. 
                 */
                else if (doneItem)
                {
                    console.log(doneItem);

                    employee.done.id(doneItem._id).remove();

                    employee.save(function(err, updatedDoneItemEmployee){
                        if(err)
                        {
                            console.log(err);
                            const deleteDoneMongoDbError = new BaseResponse('500', `Internal server error ${err.message}`, null);
                            res.status(500).send(deleteDoneMongoDbError.toObject());
                        }
                        else
                        {
                            console.log(updatedDoneItemEmployee);

                            const deleteDoneItemSuccess = new BaseResponse('200', 'Query Successful', updatedDoneItemEmployee)
                            res.status(200).send(deleteDoneItemSuccess.toObject());
                        }
                    })
                }
                else 
                //error handling for an invalid task id input
                {
                    console.log(`Invalid taskId: passed-in value ${req.params.taskId}`)
                    const invalidTaskIdResponse = new BaseResponse('200', 'Invalid taskId', null);

                    res.status(200).send(invalidTaskIdResponse.toObject());
                }
            }
        })
    }
    catch (e)
    {
        console.log(e);

        const deleteTaskCatchError = new BaseResponse('500', `Internal server error ${e.message}`, null);

        res.status(500).send(deleteTaskCatchError.toObject());
    }
})


 
//Export routing statement
module.exports = router;