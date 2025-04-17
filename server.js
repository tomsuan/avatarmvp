const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Log all incoming requests for debugging
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Serve static files from the avatar-creator folder
const staticPath = path.join(__dirname, 'avatar-creator');
console.log(`Serving static files from: ${staticPath}`);
app.use(express.static(staticPath));

// Redirect root to /survey.html
app.get('/', (req, res) => {
    console.log('Redirecting to /survey.html');
    res.redirect('/survey.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});