const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const { searchUser } = require('./helper/searchUser');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const createUser = async (event) => {
  try{
    const newUser = JSON.parse(event.body);
    const data = await searchUser(newUser.username);
    if(data.Item){
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Username already used"
        })
      }
    }
    newUser.id = v4();
    const newData = {
      TableName: 'users',
      Item: newUser
    };
    await dynamoDB.put(newData).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'SUCCESS',
          input: newUser,
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
  handler: createUser
}