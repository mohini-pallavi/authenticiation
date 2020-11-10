const jwt = require('jsonwebtoken');
const { readFile } = require('../daos/index');
const { get } = require('../routes/blog');

const dbFilePath = `${__dirname}../../../data/user-db.json`;

module.exports = {
    authenticate: async (req, res, next) => {
        const adminData = await readFile(dbFilePath);
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
    },
};
