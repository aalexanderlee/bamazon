
var mysql = require("mysql");
var table = require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "austin",

	password: "ucleagu8",
	database: "products_db"

});


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

			//console.log("Answer: ", answer);

			var userId = answer.id;
			console.log("Chosen item id: " , userId);

			var userQuant = answer.quant;
			console.log("Chosen quantity from stock: " , userQuant , "\n");

			connection.query("SELECT * FROM products WHERE ?", [{ item_id : answer.id }], function(err, res) {
				if (err) throw err;
				//grab the item_id from the table that matches
				//return the item_id
				console.table(res);
				var current_quantity = res[0].stock_quantity;
				console.log("Current quantity in stock: " , current_quantity);
				var price = res[0].price;
				var remaining_quantity = current_quantity - answer.quant;
				console.log("Remaining quantity in stock: " , remaining_quantity);

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

						console.log("Here is an updated inventory: ");
						console.log("------------------------------- \n");
						console.table(res);
					});

				} else {
					console.log("Insufficient amounts, please try again!");
				}

			connection.end();

			});
		})

}



//Random Pseudo-coding comments:
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
