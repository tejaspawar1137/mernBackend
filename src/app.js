const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const hbs = require("hbs");
const Register = require('../src/models/registers')
// require mongoose conn
require("./db/connection");
const staticPath =path.join(__dirname,"./templates/views");
const partialsPath =path.join(__dirname,"./templates/partials");
      // set partials file
hbs.registerPartials(partialsPath)
     // set engines
  app.set('views', staticPath)
    app.set('view engine', 'hbs')
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
    app.get('', (req, res) => {
        res.render('index')
    })
    app.get('/register', (req, res) => {
      res.render('register')
    })
    app.post('/register', async (req, res) => {
                try {
                  const password = req.body.password;
                  const cpassword = req.body.confirmpassword
                  if(password === cpassword){
                            const registerEmployee = new Register({
                              firstname: req.body.firstname,
                              lastname: req.body.lastname,
                              email: req.body.email,
                              phone: req.body.phone,
                              gender: req.body.gender,
                              age: req.body.age,
                              password: password,
                              confirmpassword:cpassword
                            })
                           const registered = await registerEmployee.save();
                              res.send(registered)
                           res.status(201).render(index);
                  }else {
                    res.send('password are not matching')
                  }
                }catch(err){
                  res.send(err)
                }
    })
             app.get('/login', (req, res) => {          
                       res.render('login')
             })
             app.post('/login', async (req, res) => {
                 try {
                  const email = req.body.email 
                  const password = req.body.password
             const useremail = await Register.findOne({email:email});
              if(useremail.password === password){
                res.status(201).render('index')
              }
              else {
                res.send('Invalid Login Details')
              }
                 }catch(err){
                    res.status(400).send('invalid Login')
                 }
             })
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
