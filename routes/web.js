var express     = require("express");
var router = express.Router();
var passport = require("passport");

// LLAMADO DE CONTROLADORES
const dashboardController = require('../controllers/dashboardController');

//CONTROLADOR DE MIDDLEWARE
// var AuthMiddleware = require('../middleware/auth')

//LOGIN
// router.get("/login", LoginController.login)

// router.post("/login", passport.authenticate('local', {
// 	successRedirect: '/',
// 	failureRedirect: '/login',
// 	failureFlash: true
// }));

//MIDDLEWARE
// router.use((req,res,next)=> {
// 	AuthMiddleware.isLogged(req,res,next)
// }); 


//DASHBOARD
router.get("/" , dashboardController.dashboard);

module.exports = router;