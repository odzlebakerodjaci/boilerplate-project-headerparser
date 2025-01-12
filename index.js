// index.js

// Ensure dotenv and required modules are imported at the top
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');  // Import fetch for external requests
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

// Main /api/whoami endpoint with external fetch
app.get('/api/whoami', async function(req, res){
  const ipAddress = req.ip;
  const reqLanguage = req.get('Accept-Language');
  const softwareInfo = req.get('User-Agent');

  try {
    // Fetch external data (make sure to correct the URL)
    const externalResponse = await fetch('http://127.0.0.1:3000/api/whoami');
    const responseBody = await externalResponse.text();  // Get the raw text response

    // Try to parse the response if it's valid JSON
    const externalData = JSON.parse(responseBody);  // Manually parse it

    // Send the data back in JSON format
    res.json({
      ipaddress: ipAddress,
      language: reqLanguage,
      software: softwareInfo
    });
  } catch (err) {
    console.log('Error fetching external data', err);
    res.json({ err: 'Unable to fetch external data' });
  }
});

// Start the server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
