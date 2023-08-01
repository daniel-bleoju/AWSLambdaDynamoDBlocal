const dynamoDb = require('aws-sdk/clients/dynamodb');
exports.lambdaHandler = async (event, context) => {
    try {
        const itemId = event.pathParameters.itemId;

        const params = {
            TableName: 'Songs',
            Key: {
              'Id': itemId,
              'Metadata': 'Details'
            }
        };
        const docClient = new dynamoDb.DocumentClient({'endpoint': 'http://dynamo-local:8000'});
        const response = await docClient.get(params).promise();
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
