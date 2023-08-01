const dynamoDb = require('aws-sdk/clients/dynamodb');
exports.lambdaHandler = async (event, context) => {
    const itemId = JSON.parse(event.body).id;
    const metaData = JSON.parse(event.body).metadata;
    const params = {
        TableName : 'Songs',
        Item: {
           Id: itemId,
           Metadata: metaData,
           Title: 'whatever',
           Artist: 'unknown',
           TotalDownloads: '15'
        }
    };
    try {  
        const documentClient = new dynamoDb.DocumentClient({'endpoint': 'http://dynamo-local:8000'});
        const response = await documentClient.put(params).promise();
        return getResponse(200, { items: response });
    } catch (err) {
        return getResponse(err.statusCode, err);
    }
};

const getResponse = (statusCode, response) => {
    return {
        statusCode,
        'body': JSON.stringify(response)
    };
};
