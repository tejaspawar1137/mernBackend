        const mongoose = require('mongoose');

        const employSchema = new mongoose.Schema({
            firstname: {
                type:String,
                required:true,
            },
            lastname: {
                type:String,
                required:true,
            },
            email: {
                type: String,
                required: true,
                  unique: true
            },
            phone: {
                type: Number,
                required:true,
                unique:true
            },
            gender: {
                type:String,
                required:true
            },
            age: {
                type:Number,
                required:true
            },
            password: {
                type:String,
                required:true
            },
            confirmpassword: {
                type:String,
                required:true
            },
        
        })
                // we need to create a collection
         const Register = new mongoose.model('Register',employSchema);

         module.exports = Register;