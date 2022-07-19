const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const deleteUser = async (event) => {
  try{
    const {username} = event.queryStringParameters;
    const params = {
        TableName: 'users',
        Key: {
            username
        }
    }
    await dynamoDB.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'SUCCESS',
        },
        null,
        2
      ),
    };
  } catch(e) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: String(e),
        }
      ),
    };
  }
};

module.exports = {
  handler: deleteUser
}