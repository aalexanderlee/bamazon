
var mysql = require("mysql");
var table = require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "austin", //maybe change this to "austin"

	password: "ucleagu8", //maybe change this to your actual password
	database: "products_db" 

});

//Display this from mySQL file
// function mockData() {
// 	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Socks', 'Apparel', '15', '10')");
// 	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('iPhone', 'Electronics', '600', '15')");
// 	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Tent', 'Outdoors & Recreation', '200', '5')");
// 	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Knife', 'Kitchen & Appliances', '100', '20')");
// 	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Body Bag', 'Outdoors & Recreation', '75', '8')");
// 	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Bleach', 'Household', '10', '13')");
// 	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Pre-written alibi', 'Stationaries', '10', '30')");
// }

function renderTable() {
	connection.connect(function(err) {

		connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err
		else console.table(res , "\n");
		inquireThisId();
		});
	});
}
renderTable();


function inquireThisId() {	

	inquirer.prompt([

		{
		 type: "input",
		 name: "id",
		 message: "Please enter a valid Item ID number.\n",
		 validate: function(value) {
		 	if (!isNaN(value) && value < 11) {
		 		return true;
		 	}
		 	return false;
		 }
		},

		{
		 type: "input",
		 name: "quant",
		 message: "How many of these items would you like to buy? \n",
		 validate: function(value) {
		 	if (!isNaN(value)) {
		 		return true;
		 	}
		 	return false;
			}
		}

		]).then(function(answer) {

			// console.log("Answer: ", answer);

			// var userId = answer.id;
			// console.log("Item ID: " , userId);

			// var userQuant = answer.quant;
			// console.log("Stock Quantity: " , userQuant , "\n");

			connection.query("SELECT * FROM products WHERE ?", [{ item_id : answer.id }], function(err, res) {
				if (err) throw err;				
				//grab the item_id from the table that matches 
				//return the item_id
				console.table(res);
				var current_quantity = res[0].stock_quantity;
				console.log(current_quantity);
				var price = res[0].price;
				var remaining_quantity = current_quantity - answer.quant;
				console.log(remaining_quantity);

				if(current_quantity > answer.quant) {

					console.log("Amount Remaining: " + remaining_quantity);
					console.log("Total Cost: " + (answer.quant * price) + "\n");

					connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
                    [
                    remaining_quantity, answer.id
                    ],

					// connection.query("UPDATE products SET stock_quantity=? WHERE item_id?", 
					// 	[remaining_quantity, answer.id],

						function(err, res){
							console.table(res);
						});

					connection.query("SELECT * FROM products", function(err, res) {

						console.log("Here is the updated table: ");
						console.log("--------------------------- \n");
						console.table(res);
					});

				} else {
					console.log("Insufficient amounts, please try again!");
				}

				connection.end();

				});
			})

			//if (parseQuant <= VALUE of stock_quantity in answer.id of products) {
				//console.log("Insufficient quantity!")
				//process.exit();
			// compareId(parseId);
			// compareStock(parseQuant);

		//});
}

// function compareId(parseId) {
// 	connection.query("SELECT * FROM products WHERE ?", { item_id : parseId }, function(err, data) {
// 		if (err) throw err;

// 		//grab the item_id from the table that matches 
// 		//return the item_id
// 		console.log(data);
// 	})
// }

// function compareStock(parseQuant) {
// 	connection.query("SELECT * FROM products WHERE stock_quantity=" + parseQuant), function(err, data) {
// 		if(err) throw err;
// 		//grab the stock_quantity from table that matches parseQuant
// 		//subtract parseQuant from stock_quantity value
// 		console.log(data);
// 	} 
// }
			
// 			//if(parseInt(answer.quant) <= VALUE of stock_quantity in answer.id of products) {
				
				//subtract parseInt(answer.quant) from stock_quantity ---> (var remain = stock_quantity - parseInt(answer.quant));
				
				//connection.query("UPDATE in products (stock_quantity) WHERE (answer.id = item_id) and VALUE is (remain)");
				
				//multiply parseInt(answer.quant) to VALUE price in answer.id of products ---> (var costTot = price * parseInt(answer.quant))
				
				//connection.query("UPDATE in products (price) WHERE (answer.id = item_id) and VALUE is (costTOT)");
				
				//save the updated table to mysql and to the screen
				//console.log this new table to the screen

			// else if (parseInt(answer.quant) <= VALUE of stock_quantity in answer.id of products) {
				//console.log("Insufficient quantity!")
				//process.exit();
			//}


		//});

//}

//connection.end();








