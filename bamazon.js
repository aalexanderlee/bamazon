var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "austin", //maybe change this to "austin"

	password: "ucleagu8", //maybe change this to your actual password
	database: "bamazon_db" 

});

connection.connect(function(err) {
	if(err) throw err;
	//runSearch();
})