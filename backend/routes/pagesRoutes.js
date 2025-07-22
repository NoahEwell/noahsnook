import express from 'express';
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.render('index');  // Renders the `index.ejs` in `views`
});

// Projects route
router.get('/projects', (req, res) => {
    res.render('projects');  // Renders the `projects.ejs` file
});

// Resume route
router.get('/resume', (req, res) => {
    res.render('resume');  // Renders the `resume.ejs` file
});

// Contact route
router.get('/contact', (req, res) => {
    res.render('contact');  // Renders the `contact.ejs` file
});

// Qr route
router.get('/qr', (req, res) => {
    res.render('qr');  // Renders the `qr.ejs` file
});

export default router;