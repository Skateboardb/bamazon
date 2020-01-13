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

// function(answer) {
// 	var query = "SELECT position, song, year FROM top5000 WHERE ?";
// 	connection.query(query, { artist: answer.artist }, function(err, res) {
// 	  if (err) throw err;
// 	  for (var i = 0; i < res.length; i++) {
// 		console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
// 	  }
// 	  runSearch();
// 	});
//   };

function allItems(answer) {
	var query = "SELECT * FROM products ";
	connection.query(query, function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log(
				" Item: " +
					res[i].product_name +
					"\n Department: " +
					res[i].department_name +
					"\n Price: " +
					res[i].price +
					"\n no. available: " +
					res[i].stock_quantity +
					"\n Item ID: " +
					res[i].item_id +
					"\n ---------------------" +
					"\n ---------------------"
			);
		}
	});
}

allItems();

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
