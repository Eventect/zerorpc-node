var zerorpc = require("..");

var server = new zerorpc.Server({
  addMan: function(sentence, reply) {
    reply(null, sentence + ", man!");
  },

  add42: function(n, reply) {
    reply(null, n + 42);
  },

  iter: function(from, to, step, reply) {
    for (i = from; i < to; i += step) {
      reply(null, i, true);
    }

    reply();
  }
});

server.on("error", function(error) {
  console.error("RPC server error:", error);
});

server
  .bind("tcp://0.0.0.0:4242")
  .then(() => {
    console.log("serving tcp://0.0.0.0:4242");
  })
  .catch(err => {
    console.error(err);
  });

// Ctrl-C to terminate, server connection is closed at that time
process.stdin.resume();
process.on('SIGINT', function() {
  console.log('Closing server connection');
  server.close();
  process.exit();
});