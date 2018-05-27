const express      = require('express');
const router       = express.Router();
const bcrypt     = require('bcrypt');
const crypto     = require('crypto');
const nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {
  const email = req.body.email;
  const code = crypto.randomBytes(20).toString('hex');
  const hash = bcrypt.hashSync(code, 10);

  res.locals.connection.query(`SELECT * FROM Users WHERE Email='${email}'`,
    function(error, results, fields) {
      // if (error) throw error;
    
      if (results.length) {
        const userId = results[0].UserId;
        
        res.locals.connection.query(`UPDATE Users SET RecoveryCode='${hash}' WHERE Email='${email}'`,
          function(error, results, fields) {
            // if (error) throw error;

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'sentfromcoinbankr@gmail.com',
                pass: 'SoSecure101'
              }
            });
            
            const mailOptions = {
              from: 'sentfromcoinbankr@gmail.com',
              to: email,
              subject: 'CoinBankr - Password Reset',
              text: `Hello, please click the link below to reset your password. \n\n` +
                `http://coinbankr.com/recover/${code}/${userId}/`,
            }

            transporter.sendMail(mailOptions, function(error, info) {
              if (error) throw error;
            })

            res.send(JSON.stringify('recovered'));
          }
        )
      } else {
        res.send(JSON.stringify('notFound'));
      }
    }
  )

});

module.exports = router;
