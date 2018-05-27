const express    = require('express');
const router     = express.Router();
const crypto     = require('crypto');
const bcrypt     = require('bcrypt');
const nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {
  const name  = req.body.name;
  const email = req.body.email;
  const pass  = req.body.password;
  const hash  = bcrypt.hashSync(email.toUpperCase() + pass, 10);
  const code  = crypto.randomBytes(20).toString('hex');

  res.locals.connection.query(`SELECT * FROM Users WHERE Email='${email}'`, 
    function (error, results, fields) {
      if (error) throw error;
      if (results.length) {
        res.send(JSON.stringify('emailTaken'));
      } else {
        res.locals.connection.query(`INSERT INTO Users ( UserName, Email, Password, Verified, VerifyCode )` + 
          ` VALUES ( '${name}', '${email}', '${hash}', FALSE , '${code}' )`,
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
              subject: 'CoinBankr - Please confirm your email',
              text: `Hello, thank you for registering. Please click the link below to confirm your email address. \n\n` +
                `http://coinbankr.com/verify/${code}/`,
            }

            transporter.sendMail(mailOptions, function(error, info) {
              if (error) throw error;
            })

            res.send(JSON.stringify('registered'));
          }
        )
      }
    }
  );
});

module.exports = router;
