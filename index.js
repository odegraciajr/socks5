const socks5 = require('simple-socks');
const port = 1081;
const USERNAME = process.env.AUTH_USERNAME || 'socks';
const PASSWORD = process.env.SOCKS_PASSWORD || process.env.USER;

console.log(`USERNAME: ${USERNAME} PASSWORD: ${PASSWORD}`);

const options = {
  authenticate: function (username, password, socket, callback) {
    if (username === USERNAME && password === PASSWORD) {
      return setImmediate(callback);
    }

    const errMsg = 'incorrect username and password';
    console.log(errMsg);
    return setImmediate(callback, new Error(errMsg));
  }
};

const server = socks5.createServer(options);

server.listen(port, '0.0.0.0', function () {
  console.log(`SOCKS5 proxy server started on 0.0.0.0:${port}`);
});

server.on('proxyConnect', (info, destination) => {
  console.log('connected to remote server at %s:%d', info.address, info.port);
});

// When an error occurs connecting to remote destination
server.on('proxyError', (err) => {
  console.error('unable to connect to remote server');
  console.error(err);
});

// When a request for a remote destination ends
server.on('proxyDisconnect', (originInfo, destinationInfo, hadError) => {
  console.log(
    'client %s:%d request has disconnected from remote server at %s:%d with %serror',
    originInfo.address,
    originInfo.port,
    destinationInfo.address,
    destinationInfo.port,
    hadError ? '' : 'no '
  );
});

// When a proxy connection ends
server.on('proxyEnd', (response, args) => {
  console.log('socket closed with code %d', response);
  console.log(args);
});
