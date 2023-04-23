const express = require('express');
const route = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : "./public/pdfs",
    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const upload = multer({
    storage : storage
}).array('userPdfs',10);

const services = require('../services/render');

route.get('/', services.homeRoutes);
route.get('/login', services.loginRoutes);
route.post('/Home', services.loginRoutes_home);

route.post('/upload-pdfs', upload, services.upload_pdf);

route.get('/history/:id', services.history);

// route.get('/admin', services.admin_home_Routes);
route.delete('/deltePdf/:id', services.delete_pdf);
route.post('/printed/:id', services.print_pdf);

route.get('/register', services.registerRoutes);
route.post('/login', services.register_user);


module.exports = route;