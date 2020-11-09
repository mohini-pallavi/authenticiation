const jwt = require('jsonwebtoken');
const { readFile } = require('../daos/index');
const { get } = require('../routes/blog');

const dbFilePath = `${__dirname}../../../data/user-db.json`;

module.exports = {
    authenticate: async (req, res, next) => {
        const adminData = await readFile(dbFilePath);
        //Note : YOUR CODE:

        // const email=req.user.email;
        // const user=adminData.find(
        //     (user) => user.email === email
        // );
        // if(user.email && user.password)
        // {
        //     const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '0.2h' });
        //     res.json({ status: 200, data: { token } });
        //
        // }
        // else{
        //     next({ status: 400, message: "Invalid username/password !", data: null });
        //
        // }

        const username = req.body.username;
       const password = req.body.password;

       const oneUser = adminData.filter(function (user){
           if(user.username === username && user.password === password){
               return user;
           }
       });

       if(oneUser) {
           const token = jwt.sign({ id: oneUser.id }, req.app.get('secretKey'), { expiresIn: '1h' });
           res.json({ status: 200, data: { token } });
       }
        else {
           next({ status: 400, message: "Invalid username/password !", data: null });
       }
      //NOTE: match if username & password are equal to the ones from user-db.json
        /** if true:
        * const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
        * res.json({ status: 200, data: { token } });
        */
       /**
        * else:
        * next({ status: 400, message: "Invalid username/password !", data: null });
        */
    },
};
