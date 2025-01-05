import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, '../public_html')));

// Make Date available across all pages
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();  // Set "year" as a local variable
    next();  // Move to the next middleware or route handler
});

// Define routes
app.get('/', (req, res) => {
    res.render('index', { currentPath: req.url }); 
});
app.get('/contact', (req, res) => {
    res.render('contact', { currentPath: req.url });
});
app.get('/projects', (req, res) => {
    res.render('projects', { currentPath: req.url });
});
app.get('/resume', (req, res) => {
    res.render('resume', { currentPath: req.url });
});
app.get('/games', (req, res) => {
  res.render('games', { currentPath: req.url });
});
app.get('/books', (req, res) => {
  res.render('books', { currentPath: req.url });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
