#!/bin/bash

# Intended for ubuntu/xenial64

apt-get update

# set timezone to New Zealand
cp /usr/share/zoneinfo/NZ /etc/localtime

# Install git
apt-get install git

# Install node
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt-get install nodejs -y
rm nodesource_setup.sh

# Install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt-get update
apt-get install yarn -y

# Install pm2
npm install -g pm2

# Install nginx
# apt-get install nginx -y

# Install apache
# apt-get install apache2 -y

# Install Mysql
# apt-get install mysql-server -y

# 
