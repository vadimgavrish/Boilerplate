var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', function(req, res, next) {
  if (req.cookies.accessCode) {
      const userId = req.cookies.accessCode.substring(20);
      const code = req.cookies.accessCode.slice(0, 20);
      
      res.locals.connection.query(`SELECT * FROM Users WHERE UserId='${userId}'`,
        function (error, results, fields) {
          if (error) throw error;

          if (results.length === 0) {
            res.clearCookie('accessCode');  
            res.send(JSON.stringify('fail'));        
          } else {

            if (results[0].AccessCode) {
              const valid = bcrypt.compareSync(code, results[0].AccessCode)

              if (valid) {
                const userObj = {
                  name: results[0].UserName,
                  verified: results[0].Verified
                }
    
                res.send(JSON.stringify(userObj));
              } else {
                res.clearCookie('accessCode');  
                res.send(JSON.stringify('fail'));     
              }
            } else {
              res.clearCookie('accessCode');  
              res.send(JSON.stringify('fail'));
            }
          }
        }
      )
  } else {
    res.send(JSON.stringify('fail'));
  }
});

module.exports = router;
