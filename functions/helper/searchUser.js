const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const searchUser = async (username) => {
  const params = {
    TableName: 'users',
    Key: {
      username
    },
  };
  const data = await dynamoDB.get(params).promise();
  return data;
};

module.exports = {searchUser}