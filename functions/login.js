const { searchUser } = require('./helper/searchUser');

const userLogin = async (event) => {
  try{
    const userData = JSON.parse(event.body);
    const body = {};
    let statusCode = 200;
    const data = await searchUser(userData.username);
    if(data.Item){
      if(data.Item.password === userData.password){
        body.message = "Login success";
      }else{
        statusCode = 400;
        body.message = "Wrong password";
      }
    }else{
      statusCode = 400;
      body.message = "User not found";
    }
    return {
      statusCode,
      body: JSON.stringify(body),
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
  handler: userLogin
}