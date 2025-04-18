const express = require('express');
const cors = require('cors');
const { put, get, del } = require('@vercel/blob');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Log all incoming requests for debugging
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // 204 No Content
});

// Serve static files from the avatar-creator folder
const staticPath = require('path').join(__dirname, 'avatar-creator');
console.log(`Serving static files from: ${staticPath}`);
app.use(express.static(staticPath));

// Redirect root to /survey.html
app.get('/', (req, res) => {
    console.log('Redirecting to /survey.html');
    res.redirect('/survey.html');
});

// Blob storage key for avatars
const AVATARS_BLOB_KEY = 'avatars.json';

// Initialize avatars if not exists
async function initializeAvatars() {
    try {
        const { blob } = await get(AVATARS_BLOB_KEY);
        if (!blob) {
            await put(AVATARS_BLOB_KEY, JSON.stringify([]), { access: 'public' });
        }
    } catch (error) {
        console.error('Error initializing avatars:', error);
        await put(AVATARS_BLOB_KEY, JSON.stringify([]), { access: 'public' });
    }
}
initializeAvatars();

// API to get all avatars
app.get('/api/avatars', async (req, res) => {
    try {
        const { blob } = await get(AVATARS_BLOB_KEY);
        if (!blob) {
            res.json([]);
            return;
        }
        const avatars = await blob.text();
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
        const { blob } = await get(AVATARS_BLOB_KEY);
        let avatars = [];
        if (blob) {
            avatars = JSON.parse(await blob.text());
        }
        avatars.push(newAvatar);
        await put(AVATARS_BLOB_KEY, JSON.stringify(avatars), { access: 'public' });
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