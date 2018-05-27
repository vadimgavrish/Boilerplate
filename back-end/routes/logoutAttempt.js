var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const accessCode = req.cookies.accessCode;
  const userId = accessCode.substring(20);

  res.locals.connection.query(`UPDATE Users SET AccessCode=NULL WHERE UserId='${userId}'`, {
    function(error, results, fields) {

    }
  });
  res.clearCookie('accessCode');  
  res.send(JSON.stringify('logoutSuccessful'));
});

module.exports = router;
