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
				ID: res[i].item_id,
				stock: res[i].stock_quantity,
				price: res[i].price
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
	connection.query(query, function(err, res) {
		if (err) throw err;

		inquirer.prompt(questions).then(function(user) {
			for (var i = 0; i < available.length; i++) {
				if (
					user.item == available[i].ID &&
					user.quantity <= available[i].stock
				) {
					connection.query(
						"UPDATE products SET ? WHERE ?",
						[
							{
								stock_quantity: res[i].stock_quantity - user.quantity
							},
							{
								item_id: user.item
							}
						],
						function(err) {
							if (err) throw err;
							console.log("Order placed succesfully!");
							// console.log(stock_quantity);
						}
					);
				} else if (
					user.item == available[i].ID &&
					user.quantity > available[i].stock
				) {
					inquirer
						.prompt({
							type: "confirm",
							name: "excess",
							message:
								"Oops! Looks like we only have " +
								available[i].stock +
								" in stock. Would you like to place an order for " +
								available[i].stock +
								"?"
						})
						.then(function(user) {
							if (user.excess) {
								console.log("Okay! Placing order...");

								connection.query(
									"UPDATE products SET ? WHERE ?",
									[
										{
											stock_quantity: 0
										},
										{
											id: user.item
										}
									],
									function(err) {
										if (err) throw err;
										console.log("Order placed succesfully!");
									}
								);
							}
						});
					// console.log(
					// 	"Oops! Looks like we only have " +
					// 		available[i].stock +
					// 		" in stock. Would you like to place an order for" +
					// 		available[i].stock +
					// 		"?"
					// );
				}
			}
		});
	});
}

// function idLookup(res) {

// }
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
