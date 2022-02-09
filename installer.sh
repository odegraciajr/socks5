#!/usr/bin/env bash

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile
nvm install 14.17
npm install pm2 -g

rm -rf $HOME/socks5
mkdir -p $HOME/socks5
cd $HOME/socks5

curl https://raw.githubusercontent.com/odegraciajr/socks5/main/package.json -o $PWD/package.json
curl https://raw.githubusercontent.com/odegraciajr/socks5/main/index.js -o $PWD/index.js

npm install --only=production
pm2 start index.js

