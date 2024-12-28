const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(bodyParser.json());

// Set the static folder
app.use(express.static(path.join(__dirname, "public")));

// Serve your HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission (frontend will manage email sending using EmailJS)
app.post('/submit-plan', (req, res) => {
  const { name, date, time, location, custom_location, activity, custom_activity, thoughts } = req.body;

  // Create a response message
  const responseMessage = `
    Name: ${name}\n
    Date: ${date}\n
    Time: ${time}\n
    Location: ${location} (Other: ${custom_location})\n
    Activity: ${activity} (Other: ${custom_activity})\n
    Thoughts: ${thoughts}
  `;

  // Log the response message
  console.log("Form Submitted:\n", responseMessage);

  // Simulated email sending (handled via EmailJS on frontend)
  res.json({ message: 'Response received! Email will be sent via frontend.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
