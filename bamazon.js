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
	allItems();
});
// itemPrompt();

// Run App
var query = "SELECT * FROM products ";
var available = [];

function allItems(answer) {
	connection.query(query, function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log(
				" \n Item: " +
					res[i].product_name +
					"|| Department: " +
					res[i].department_name +
					"|| Price: " +
					res[i].price +
					"|| no. available: " +
					res[i].stock_quantity +
					"|| Item ID: " +
					res[i].item_id +
					"\n ---------------------" +
					"\n ---------------------"
			);

			available.push({
				name: res[i].product_name,
				ID: res[i].item_id
			});
		}
		itemPrompt();
	});
}

// shows all available products with ID, name, price, & # available

// user interaction begins

function processAnswers(answers) {
	console.log("Does this look right?", answers);
}

var questions = [
	{
		name: "item",
		type: "input",
		message:
			"Know what you wanna buy? Enter the ID of the item you'd like to purchase."
	},
	{
		name: "quantity",
		type: "number",
		message: "How many would you like to order?"
	}
];

function itemPrompt() {
	inquirer.prompt(questions, processAnswers).then();
}
// itemPrompt()

// -- prompts user to enter id of desired item

// -- asks user how many units they'd like

// -- confirm order

// checks to be sure there are enough of an item

// -- if not, log "Sorry, we only have [value] of those left. Would you like to place an order for [value]?"

// -- confirm choice

// fulfill customer order

// -- update database to reflect remaining quantity

// -- show customer total cost of purchase
