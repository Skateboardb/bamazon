var mysql = require("mysql");
var inquirer = require("inquirer");
// Establish SQL connection
var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected successfully to bamazon");
});

// Run App

// shows all available products with ID, name, price, & # available

// user interaction begins

// -- prompts user to enter id of desired item

// -- asks user how many units they'd like

// -- confirm order

// checks to be sure there are enough of an item

// -- if not, log "Sorry, we only have [value] of those left. Would you like to place an order for [value]?"

// -- confirm choice

// fulfill customer order

// -- update database to reflect remaining quantity

// -- show customer total cost of purchase
