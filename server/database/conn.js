// const mongoose = require('mongoose');

// var connectDB = async() => {
//     try {
//         var con = await mongoose.connect('mongodb://127.0.0.1/easyZerox', {
//             useNewUrlParser : true,
//             useUnifiedTopology : true
//         });
//         console.log(`MONGODB Connected : ${con.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const con = await mongoose.connect('mongodb+srv://Ravi:aE1kiQqAdjWP8A5Q@cluster0.jogbsme.mongodb.net/EasyXerox?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MONGODB Connected : ${con.connection.host}`)
    }catch(err){
        console.log(err);
    }
};

module.exports = connectDB;

