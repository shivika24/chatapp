var express    =  require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
require('./dbconnection');
var user =  require('./routes/user'); 
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',"*") 
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Acess-Control-Allow-Headers,Authorization,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
});
var router = express.Router(); 
app.post('/adduser',user.adduser);   
app.post('/checkuser',user.checkuser);  
app.post('/deleteuser',user.deleteuser);
app.post('/checktype',user.checktype);   
app.post('/adminname',user.adminname);
app.post('/addmsg',user.addmsg);
app.get('/getmsg',user.getmsg); 
app.post('/checkadmin',user.checkadmin);
app.post('/updateimg',user.updateimg);
app.post('/getimg',user.getimage);
app.listen(8082,()=>{ 
    console.log("Server is Listening At Port 8082")  
})