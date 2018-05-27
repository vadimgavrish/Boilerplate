# Full Stack Boilerplate

This setup involves a ubuntu web server, the environment and starting up the site. The site uses a MySQL database, phpMyAdmin, Express JS back-end and React front-end. 

## Quick Setup

- setup Ubuntu 16.04 server

- setup environment
  - nodeJS
  - mysql
  - php
  - nginx
  - pm2

- clone code to the server

- setup database

- configure nginx

- start the site!
  - `pm2 start ./bin/www` from /back-end
  - `sudo service nginx start`

## Detailed Setup

**1.** Create Setup (AWS)

Create AWS EC2 instance, Ubuntu Server 16.04 LTS

![](/front-end/public/1.png)

Configure security groups

![](/front-end/public/2.png)
![](/front-end/public/3.png)

Create and download a key, it is used to access the server.

![](/front-end/public/4.png)

Launch the instance, then click View Instances.

Copy the Public DNS (IPv4)

![](/front-end/public/5.png)

**2.** Log in to the server

In Terminal, go to the directory where you downloaded the AWS key. 

Make your key secure, but running the chmod command.

`chmod 400 [keyName].pem`

Log in to the server.

Run `ssh -i [keyName].pem ubuntu@[publicDNS]`

Ex. `ssh -i KEY.pem ubuntu@ec2-18-222-63-151.us-east-2.compute.amazonaws.com`

You should be logged in!

**3.** Environment setup

Stop Apache server, Nginx will be using post 80 instead.

`sudo /etc/init.d/apache2 stop`

Install NodeJS

`curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -`

`sudo apt-get install -y nodejs`

Install PM2

`sudo npm install -g pm2`

Install MySQL

`sudo apt-get install mysql-server`

When asked, enter the password you wish to use to login to the database. The boilerplate is configured to use 'root' as the password, but you can change this in /back-end/App.js.

Install PHP

`sudo apt-get install php`

Install phpMyAdmin

`sudo apt-get install phpmyadmin`

Don't automatically configure for either of the two options, just click okay and continue. We will be using Nginx instead of the listed options.

![](/front-end/public/6.png)

Select yes to config with dbconfig-common

![](/front-end/public/7.png)

Create symbolic link

`sudo ln -s /usr/share/phpmyadmin /usr/share/nginx/html`

Install nginx

`sudo apt-get install nginx`

**4.** Starting up the site

Go to the main directory

`cd ~`

Clone this repo into a folder called App

`git clone https://github.com/MarkdaleMGMT/Vadim.git App`

Go into the folder

`cd App`

Start up the back-end

`cd back-end`

`npm install`

then

`pm2 start ./bin/www`

Start up the front-end

`cd ..`

`cd front-end`

`npm run build`

We now need to create a database for the site by running a setup file.
First, log into the mysql database

`mysql -u root -p`

Enter the password you chose when installing mysql

then run the setup file 

`source /home/ubuntu/App/back-end/sql/boilerplate.sql`

Configure nginx

Go to nginx sites directory

`cd /etc/nginx/sites-avaliable`

Delete the default config file

`sudo rm -rf default`

Copy the new config file into the folder

`cp /home/ubuntu/App/default .`

Restart nginx

`sudo service nginx restart`



That's it! You should be able to go to your server's URL and register / login.


### TIPS

You can check to make sure the correct processes are running by doing 'service' checks.

Ex.

`sudo service mysql status`
`sudo service nginx status`

