const dynamoDb = require('aws-sdk/clients/dynamodb');
exports.lambdaHandler = async (event, context) => {
    const itemId = JSON.parse(event.body).id;
    const metaData = JSON.parse(event.body).metadata;
    const title = JSON.parse(event.body).title;
    const artist = JSON.parse(event.body).artist;
    const totalDownloads = JSON.parse(event.body).totalDownloads;
    const params = {
        TableName : 'Songs',
        Key: { 
            Id : itemId,
            Metadata: metaData
        },
        UpdateExpression: "set Title = :Title, Artist = :Artist, TotalDownloads= :TotalDownloads ",
        ExpressionAttributeValues: {
            ':Title': title,
            ':Artist': artist,
            ':TotalDownloads': totalDownloads
          }
    };
    try {  
        const documentClient = new dynamoDb.DocumentClient({'endpoint': 'http://dynamo-local:8000'});
        const response = await documentClient.update(params).promise();
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
