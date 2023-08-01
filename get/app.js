const dynamoDb = require('aws-sdk/clients/dynamodb');
exports.lambdaHandler = async (event, context) => {
    const params = {
        TableName: 'Songs'
    };
    try {  
        const documentClient = new dynamoDb.DocumentClient({'endpoint': 'http://dynamo-local:8000'});
        const response = await documentClient.scan(params).promise();
        return getResponse(200, { items: response });
    } catch (err) {
        console.log(err);
        return getResponse(err.statusCode, err);
    }
};

const getResponse = (statusCode, response) => {
    return {
        statusCode,
        'body': JSON.stringify(response)
    };
};
