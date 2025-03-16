import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import qr from 'qr-image';

dotenv.config();  // Load environment variables

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse form data from POST bodies
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));  // EJS views directory
app.set('view engine', 'ejs');

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, '../public_html')));

// Make Date available across all pages (e.g., in footer)
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();  // Dynamic year for templates
    next();  // Pass control to the next middleware
});

// Define routes
app.get('/', (req, res) => res.render('index', { currentPath: req.url }));
app.get('/contact', (req, res) => res.render('contact', { currentPath: req.url }));
app.get('/projects', (req, res) => res.render('projects', { currentPath: req.url }));
app.get('/resume', (req, res) => res.render('resume', { currentPath: req.url }));
app.get('/games', (req, res) => res.render('games', { currentPath: req.url }));
app.get('/books', (req, res) => res.render('books', { currentPath: req.url }));
app.get('/qr', (req, res) => {
    // When user visits /qr (GET), we just show the page without a QR yet
    res.render('qr', { 
        currentPath: req.url,
        qrCode: null,
        urlText: ''
    });
});

// POST route to handle form submission and generate QR
app.post('/generate-qr', (req, res) => {
    const url = req.body.url; // 'url' is the name attribute from the form

    // Generate QR code in-memory
    const qrPng = qr.imageSync(url, { type: 'png' });

    // Encode QR code as base64 so we can show it in an <img> tag
    const qrBase64 = 'data:image/png;base64,' + qrPng.toString('base64');

    // Render the same or a different EJS template with the QR code
    // We'll reuse the "qr" template
    res.render('qr', {
        currentPath: '/qr',
        qrCode: qrBase64,
        urlText: url
    });
});

// Error testing routes
app.get('/custom-error-404', (req, res) => res.status(404).render('errors/404'));
app.get('/custom-error-500', (req, res) => res.status(500).render('errors/500'));

// Catch-all 404 error handler (must come last)
app.use((req, res) => {
    res.status(404).render('errors/404', { currentPath: '' });  // Render the custom 404 page
});

// General error handling middleware (for unexpected errors)
app.use((err, req, res, next) => {
    console.error(`Error: ${err.stack}`);  // Log the error stack trace
    res.status(500).render('errors/500', { currentPath: '' });  // Render the custom 500 page
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
