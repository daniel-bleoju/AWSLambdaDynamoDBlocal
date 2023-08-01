const dynamoDb = require('aws-sdk/clients/dynamodb');
exports.lambdaHandler = async (event, context) => {
    const itemId = JSON.parse(event.body).id;
    const metaData = JSON.parse(event.body).metadata;
    var params = {
        TableName : 'Songs',
        Key: {
            Id: itemId,
            Metadata: metaData
        }
    };
    try {  
        const documentClient = new dynamoDb.DocumentClient({'endpoint': 'http://dynamo-local:8000'});
        const response = await documentClient.delete(params).promise();
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
