const express = require('express');
const fs = require('fs').promises;
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

// File to store avatars (temporary, will replace with a database later)
const avatarsFile = path.join(__dirname, 'avatars-data.json');

// Initialize avatars file if it doesn't exist
async function initializeAvatarsFile() {
    try {
        await fs.access(avatarsFile);
    } catch (error) {
        await fs.writeFile(avatarsFile, JSON.stringify([]));
    }
}
initializeAvatarsFile();

// API to get all avatars
app.get('/api/avatars', async (req, res) => {
    try {
        const avatars = await fs.readFile(avatarsFile, 'utf8');
        res.json(JSON.parse(avatars));
    } catch (error) {
        console.error('Error loading avatars:', error);
        res.status(500).json({ error: 'Failed to load avatars' });
    }
});

// API to add a new avatar
app.post('/api/avatars', async (req, res) => {
    try {
        const newAvatar = req.body;
        const avatars = JSON.parse(await fs.readFile(avatarsFile, 'utf8'));
        avatars.push(newAvatar);
        await fs.writeFile(avatarsFile, JSON.stringify(avatars, null, 2));
        res.status(201).json(newAvatar);
    } catch (error) {
        console.error('Error saving avatar:', error);
        res.status(500).json({ error: 'Failed to save avatar' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});