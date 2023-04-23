const User = require('../model/userModel');
const Pdf = require('../model/pdfModel');
const fs = require('fs');
const pageCounter = require('pdf-page-counter');
const axios = require('axios')


exports.homeRoutes = (req, res) => {
    res.render('index');
}

exports.loginRoutes = (req, res) => {
    res.render('login');
}

exports.registerRoutes = (req, res) => {
    res.render('register');
}

exports.register_user = async (req, res) => {
    if (req.body.length != 0) {
        let user = new User(req.body);
        try {
            let data = await user.save();
            console.log(data);
            res.render('login');
        } catch (error) {
            res.send({ message: error.message });
        }
    } else {
        res.send({ message: "Can not register user..!!" })
    }
}

exports.loginRoutes_home = async (req, res) => {
    if (req.body.length != 0) {

        try {
            if(req.body.email == "admin@gmail.com"){
                if(req.body.password == "admin"){
                    let pdfs = await Pdf.find().populate('userId');
                    res.render('admin', { pdfs: pdfs });
                } else {
                    res.render('login');
                }
            } else {
                let userdata = await User.find({ email: req.body.email });
                console.log(userdata);
                if(userdata[0].password == req.body.password){
                    // res.send(userdata);
                    res.render('profile', { user: userdata });
                } else {
                    res.render('login');
                }
            }
        } catch (error) {
            res.send({ message: error.message });
        }
    } else {
        res.send({ message: "Can not login user..!! enter valid Credentials..!!!" })
    }
}

exports.upload_pdf = async (req, res) => {
    console.log(req.files);
    let files = req.files;
    //convert images into base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path);        // it will perform images and store in variable

        return encode_image = img.toString('base64');
    })


    let result = imgArray.map((src, index) => {

        // pdfjsLib.getDocument(`/public/pdfs/${req.files[index].filename}`).promise.then(function (doc) {
        //     var numPages = doc.numPages;
        //     console.log('# Document Loaded');
        //     console.log('Number of Pages: ' + numPages);
        // });

        let dataBuffer = fs.readFileSync(req.files[index].path);

        pageCounter(dataBuffer).then(function(data) {
 
            // number of pages
            console.log(data.numpages);
            // // number of rendered pages
            // console.log(data.numrender);
            // // PDF info
            // console.log(data.info);
            // // PDF metadata
            // console.log(data.metadata);
            // // PDF.js version
            // // check https://mozilla.github.io/pdf.js/getting_started/
            // console.log(data.version);
            // // PDF text
            // console.log(data.text);
            let charge = data.numpages * 5;
         
            // create object to store data in the collection
            let finalImg = {
                userId: req.body.userId,
                pdf: req.files[index].originalname,
                contentType: req.files[index].mimetype,
                path : req.files[index].path,
                charge : charge,
                page : data.numpages,
                pdfBase64: src
            }
    
            let newUpload = new Pdf(finalImg);
    
            return newUpload.save().then(() => {
                return { msg: ` ${files[index].originalname} Uploaded Successfully..` };
            }).catch(err => {
                if (err) {
                    if (err.name == "MongoError" && err.code == 11000) {
                        return Promise.reject({ error: `Duplicate ${files[index].originalname}, File alresdy exists` })
                    }
                    return Promise.reject({ error: error.message || `Can not upload ${files[index].originalname} Something Missing` })
                }
            })
        });

    })
    
    let userdata = await User.find({ email: req.body.email });
    console.log(userdata);

    Promise.all(result).then(msg => {
        res.render('profile', { user: userdata });
    }).catch(err => {
        res.json(err);
    })
}

exports.history = async (req, res) => {

    try {
        let pdfs = await Pdf.find({ userId: req.params.id }).populate('userId');
        res.render('history', { pdfs: pdfs });
    } catch (error) {
        res.send(error);
    }

}

exports.admin_home_Routes = async(req, res) => {
    try {
        let pdfs = await Pdf.find().populate('userId');
        res.render('admin', { pdfs: pdfs });
    } catch (error) {
        res.send(error);
    }
}

exports.delete_pdf = async(req, res) => {
    
    try {   
        let data = await Pdf.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send({message : error.message});
    }

}

exports.print_pdf = async(req, res) => {
    
    try {   
        let data = await Pdf.findByIdAndUpdate(req.params.id, { status : "Printed" });
        res.send(data);
    } catch (error) {
        res.send({message : error.message});
    }

}