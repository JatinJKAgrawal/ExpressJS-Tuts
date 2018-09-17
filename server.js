const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('sayItLoud', (text) => {
  return text.toUpperCase();
})

app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log(`Unable to append to the File`);
    }
  });
  next();

});

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    header: 'Home',
    para: 'Welcome to our site!',
  });
});

app.get('/bad',(req, res) => {
  res.send({
    Error: 'Something went wrong!'
  });
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About',
    header: 'About Page',
  });
});


app.listen(3000);
