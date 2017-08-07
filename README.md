# bamazon
bamazon

Points of Progression:
1) A MySQL Database called bamazon was created.
2) Table "products" was placed into this "bamazon" database.
3) Table "products" holds these following categories:
  - item_id (unique id for each product)
  - product_name (Name of product)
  - department_name
  - price (cost to customer)
  - stock_quantity (how much of the product is available in stores)
4) Ten mock data rows have been populated into the "products" table as seeds.

![Alt text](/img/bamazonPicOne.png?raw=true "A table for the seeds is produced: ")

5) The file bamazonCustomer.js is created. This application will first display all of the items available in our inventory.
6) bamazonCustomer.js will prompt all users with two inquirer messages that will grab answer values. One will ask for the ID of the product displayed on "products" and the second will ask about the number of units desired.

![Alt text](/img/bamazonPicTwo.png?raw=true "The user is requested for the values ID and quantity: ")

7) The bamazonCustomer.js will check to see if the store has enough of that item to fulfill that request.
8) The app will log a phrase "Insufficient quantity!", and prevent the order finishing.
9) When the store does have enough of a product amount, the order requested will be completed.
10) The table for "products" will display with an updated inventory amount for the product requested and purchased.
11) After the transaction finishes, the update will show the consumer a total cost of purchase. (amount of items chosen x price per product)

![Alt text](/img/bamazonPicThree.png?raw=true "The transaction completes, and the resulting values in our database is updated: ")

Here is a working snippet of bamazonCustomer.js:

![Alt text](/img/bamazonGif.gif?raw=true "bamazonCustomer.js GIF: ")
