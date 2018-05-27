var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const crypto     = require('crypto');

router.post('/', function(req, res, next) {
  const email = req.body.email;
  const pass  = req.body.password;

  res.locals.connection.query(`SELECT * FROM Users WHERE Email='${email}'`, 
    function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0) {
        res.send(JSON.stringify('err'));
      } else {
        const valid = bcrypt.compareSync(email.toUpperCase() + pass, results[0].Password);
        if (valid) {
          const userObj = {
            name: results[0].UserName,
            verified: results[0].Verified
          }
          
          const userId = results[0].UserId;
          const code = crypto.randomBytes(10).toString('hex');
          const hash  = bcrypt.hashSync(code, 10);
          const accessCode = code + userId;

          // expires in 15 minutes
          res.cookie('accessCode', accessCode, { maxAge: 900000 });
          
          res.locals.connection.query(`UPDATE Users SET AccessCode='${hash}' WHERE Email='${email}'`, {
            function(error, results, fields) {}
          });

          res.send(JSON.stringify(userObj));
        } else {
          res.send(JSON.stringify('err'));
        }
      }
    }
  );
});

module.exports = router;
