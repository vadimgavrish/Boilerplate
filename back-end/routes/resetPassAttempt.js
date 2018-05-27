const express   = require('express');
const router    = express.Router();
const bcrypt     = require('bcrypt');

router.post('/', function(req, res, next) {
  const url = req.headers.referer;
  
  // Change this depending on domain name length
  const code = url.substring(29, 69);
  const userId = url.substring(70, url.length - 1);

  res.locals.connection.query(`SELECT * FROM Users WHERE UserId='${userId}'`,
    function(error, results, fields) {
      // if (error) throw error;

      if (results.length) {
        const email = results[0].Email;
        const password = req.body.password;
        const recoveryCode = results[0].RecoveryCode;
        const valid = bcrypt.compareSync(code, recoveryCode);

        if (valid && recoveryCode) {
          const newPassword = bcrypt.hashSync(email.toUpperCase() + password, 10);

          res.locals.connection.query(`UPDATE Users SET Password='${newPassword}', RecoveryCode=NULL WHERE UserId='${userId}'`,
            function (error, results, fields) {
              // if (error) throw error;

              res.send(JSON.stringify('success'));
            }
          )
        } else {
          res.send(JSON.stringify('invalid'));
        }
      } else {
        res.send(JSON.stringify('invalid'));
      }
    }
  )
});

module.exports = router;
