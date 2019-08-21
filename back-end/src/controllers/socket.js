require('socketio-jwt');

io.sockets
  .on('connection', socketioJwt.authorize({
    secret: process.env.PUBLIC_KEY,
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + socket.decoded_token.name);
  });
