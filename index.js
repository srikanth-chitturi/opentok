// Dependencies
var express = require('express'),
    OpenTok = require('opentok');
    //OpenTok = require('../../lib/opentok');

// Verify that the API Key and API Secret are defined
var apiKey = "45568902",
    apiSecret = "7f976cf97ed29861c9d5a3f40eb31fcdadae3358";
if (!apiKey || !apiSecret) {
  console.log('You must specify API_KEY and API_SECRET environment variables');
  process.exit(1);
}

// Initialize the express app
var app = express();
app.use(express.static(__dirname + '/public'));

// Initialize OpenTok
var opentok = new OpenTok(apiKey, apiSecret);

// Create a session and store it in the express app
opentok.createSession(function(err, session) {
  if (err) throw err;
  app.set('sessionId', session.sessionId);
  // We will wait on starting the app until this is done
  init();
});

app.get('/', function(req, res) {
  var sessionId = app.get('sessionId'),
      // generate a fresh token for this client
      token = opentok.generateToken(sessionId);

  res.render('index.ejs', {
    apiKey: apiKey,
    sessionId: sessionId,
    token: token
  });
});

// Start the express app
function init() {
  app.listen(3000, function() {
    console.log('You\'re app is now ready at http://localhost:3000/');
  });
}
