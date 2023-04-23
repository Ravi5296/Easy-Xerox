const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    pdf: {
        type: String,
    },
    contentType: {
        type: String
    },
    charge: {
        type: String
    },
    path : {
        type :String
    },
    status : {
        type : String,
        default : "Not Printed"
    },
    page: {
        type: String
    },
    pdfBase64: {
        type: String
    }
});

const Pdf = mongoose.model("Pdf", pdfSchema);

module.exports = Pdf;