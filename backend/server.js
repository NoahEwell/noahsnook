import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
