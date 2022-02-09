#!/usr/bin/env bash

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

source /root/.bashrc
echo "installed nvm"
nvm install 14.17
npm install pm2 -g

rm -rf $HOME/socks5
mkdir -p $HOME/socks5
cd $HOME/socks5

curl https://raw.githubusercontent.com/odegraciajr/socks5/main/package.json -o $PWD/package.json
curl https://raw.githubusercontent.com/odegraciajr/socks5/main/index.js -o $PWD/index.js

npm install --only=production
pm2 start index.js

