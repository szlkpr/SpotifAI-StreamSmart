const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// Read API key from .env file
function getApiKey() {
    try {
        const envContent = fs.readFileSync('.env', 'utf8');
        const match = envContent.match(/apiKey=(.+)/);
        return match ? match[1].trim() : null;
    } catch (error) {
        console.error('Could not read .env file:', error);
        return null;
    }
}

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/api-key' && req.method === 'GET') {
        const apiKey = getApiKey();
        if (apiKey) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(apiKey);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('API key not found');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  GET /api-key - Returns OpenAI API key from .env file');
});