var express = require('express');

var app = module.exports = express();

    app.configure(function () {
    
    var appRoot = __dirname + '/';
     
    app.use(express.static(appRoot));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(express.errorHandler({dumpExceptions:true, showStack:true}));
    app.set('views', appRoot);
    
    });

    app.get("/", function(req, res){ res.sendfile('index.html'); });

    if (!module.parent) {
        app.listen(3000);
        console.log('Node Server running on local:3000');
    }
