module.exports = {
    dashboard: function(req, res){
    	let dbo = req.app.locals.dbo;
    	console.log(dbo.collection('users').find({}).toArray((err, result) => {
    		if (err) console.log(err);
    		console.log(result);
    	}));
        res.render("dashboard/dashboard");
    }
}