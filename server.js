const express =  require('express');
const hbs     = require('hbs');
const fs      = require('fs');


const app = express();

hbs.registerHelper('currentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now} : ${req.method}, ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '/n', (err) => {
       if(err){
           console.log('Unable to append to server.log');
       } 
    });
    next();
});

app.use((req, res, next) => {
    res.render('underCons',{
        message : 'this Web site is under construction now'
    });
    
});

app.get('/home',(req, res)=>{
    res.render('home.hbs',{
        pagetitle: 'Welcome Home',
        welcomeMessage: 'You are very welcome',
        
    })
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pagetile : 'About Page',
        
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'It is not conection properly to the system'
    });
});




app.listen(process.env.PORT, process.env.IP, () => {
    console.log('server is up  and running');
})