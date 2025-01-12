require('dotenv').config();
const express = require('express');
const app = express();  // Initialize the express app

// Enable CORS for remote testing
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (if needed)
app.use(express.static('public'));

// Serve the index.html file for the root route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Basic API endpoint for testing
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Main /api/whoami endpoint
app.get('/api/whoami', function(req, res){
  // Get the required information from the request
  const ipAddress = req.ip;
  const reqLanguage = req.get('Accept-Language');
  const softwareInfo = req.get('User-Agent');

  // Send the data back as a JSON response
  res.json({
    ipaddress: ipAddress,
    language: reqLanguage,
    software: softwareInfo
  });
});

// Start the server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
