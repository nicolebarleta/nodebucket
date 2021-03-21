class BaseResponse {
    constructor (httpCode, message, data)
    {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
        this.timestamp = new Date().toLocaleDateString('en-US');
    }

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

module.exports = BaseResponse;