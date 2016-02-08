module.exports = function(app) {
	app.get('/', function(req, res) {  
	    res.render('index');
	});

	app.get('/generate', function(req, res) {  
	    res.render('generate');
	});

	app.get('/encrypt', function(req, res) {  
	    res.render('encrypt');
	});

	app.get('/decrypt', function(req, res) {  
	    res.render('decrypt');
	});

	app.get('/faq', function(req, res) {  
	    res.render('faq');
	});

	app.get('/donate', function(req, res) {  
	    res.render('donate');
	});

	app.get('/contact', function(req, res) {  
	    res.render('contact');
	});

	app.get("/test/:number", function(req, res) {
	    var number = req.params.number;
	    res.json({testing: number});
	});
}