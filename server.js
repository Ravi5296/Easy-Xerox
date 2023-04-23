const express = require('express');
const path = require('path');
const app = new express();
const server = require('http').createServer(app);
const bodyparser = require('body-parser');

const connectDB = require('./server/database/conn');

connectDB();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

//EJS specific stuff
app.set('view engine', 'ejs');         //set the template engine as ejs
app.set('views', path.join(__dirname, "views"));    //set the views directory

//Express specific stuff & for serving static files
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/images', express.static(path.resolve(__dirname, "assets/images")));
app.use('/public', express.static(path.resolve(__dirname, "public")));

app.use('/', require('./server/routes/route'));
// app.use('/admin', require('./server/routes/adminRoute'));




server.listen(5050, () => {
    console.log(`the application started successfully http://localhost:5050`);
});