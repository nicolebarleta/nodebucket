/**
; Title:  base-response.js
; Author: Professor Krasso
; Date: 21 March 2021
; Modified By: Marie Nicole Barleta
; Description: This is the base response when a user 
; input a request it's connected to the employee-route
 */


//Declaration of variables 
class BaseResponse {
    constructor (httpCode, message, data)
    {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
        this.timestamp = new Date().toLocaleDateString('en-US');
    }
//This function will return the declared variables
    toObject()
    {
        return{
            'httpCode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': this.timestamp
        }
    }

}
//export statement of base response
module.exports = BaseResponse;