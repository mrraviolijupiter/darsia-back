/**
 * WebSocket Server Settings
 * (sails.config.sockets)
 *
 * Use the settings below to configure realtime functionality in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/sockets
 */

let newConnection = require('../scripts/newConnection.js');

module.exports.sockets = {

  /***************************************************************************
  *                                                                          *
  * `transports`                                                             *
  *                                                                          *
  * The protocols or "transports" that socket clients are permitted to       *
  * use when connecting and communicating with this Sails application.       *
  *                                                                          *
  * > Never change this here without also configuring `io.sails.transports`  *
  * > in your client-side code.  If the client and the server are not using  *
  * > the same array of transports, sockets will not work properly.          *
  * >                                                                        *
  * > For more info, see:                                                    *
  * > https://sailsjs.com/docs/reference/web-sockets/socket-client           *
  *                                                                          *
  ***************************************************************************/

  transports: [ 'polling','websocket' ],

  onConnect: async function(session, socket) {
    // Notify new connection
    await newConnection(socket);
  },
  /***************************************************************************
  *                                                                          *
  * `beforeConnect`                                                          *
  *                                                                          *
  * This custom beforeConnect function will be run each time BEFORE a new    *
  * socket is allowed to connect, when the initial socket.io handshake is    *
  * performed with the server.                                               *
  *                                                                          *
  * https://sailsjs.com/config/sockets#?beforeconnect                        *
  *                                                                          *
  ***************************************************************************/

  beforeConnect: function(handshake, proceed) {

    // `true` allows the socket to connect.
    // (`false` would reject the connection)

    return proceed(undefined, true);
  },


  /***************************************************************************
  *                                                                          *
  * `afterDisconnect`                                                        *
  *                                                                          *
  * This custom afterDisconnect function will be run each time a socket      *
  * disconnects                                                              *
  *                                                                          *
  ***************************************************************************/

  afterDisconnect: function(session, socket, done) {
    let activeArenas = require('../instances/activeArenas.js');
    let tryLeave = require('../scripts/eventsCB/tryLeave.js');
    let character;
    let arena;

    arena = activeArenas.currentArenas.find(a => {
      let tmp = a.charactersList.find(e => e.socket === socket.id);
      if(tmp){
        character = tmp;
      }
    });

    if (arena && character){
      tryLeave({},{},arena,character);
    }
    console.log('character disconnected');
    return done();

  },


  /***************************************************************************
  *                                                                          *
  * Whether to expose a 'GET /__getcookie' route that sets an HTTP-only      *
  * session cookie.                                                          *
  *                                                                          *
  ***************************************************************************/

  // grant3rdPartyCookie: true,

};
