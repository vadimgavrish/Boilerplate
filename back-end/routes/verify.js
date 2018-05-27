var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  const code = req.params.id;

  res.locals.connection.query(`SELECT * FROM Users WHERE VerifyCode='${code}'`,
    function (error, results, fields) {
      // if (error) throw error;

      if (results.length) {
        const userId = results[0].UserId;

        res.locals.connection.query(`UPDATE Users SET Verified=TRUE, VerifyCode=NULL WHERE UserId='${userId}'`, 
          function (error, results, fields) {
            // if (error) throw error;

            res.send(`<script>
              alert("Email confirmed! Please login.");
              window.location = "/"
              </script>`
            );
          }
        )
      }
    }
  );

});

module.exports = router;
