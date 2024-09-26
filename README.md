# Using Your CLI Tool
CLI stands for Command Line Interface. It’s a way to interact with a computer program by typing commands into a terminal or command prompt, rather than using a graphical user interface (GUI) with buttons and icons. CLIs are commonly used for tasks like managing files, running scripts, and configuring software.

In your context, it looks like you’re integrating ```commander``` into your project to build a CLI tool for managing auction items. This tool would allow you to perform various actions related to auction items from the command line, such as adding, updating, or listing items.

- ### Seed the Database:
```bash
node script/cli.js seed
```
This command would read data from ```db.json```, delete all existing auction items, and insert the new items into the database.

- ### Delete All Items:
```bash
node script/cli.js deleteAll
```
This command would remove all auction items from the database.

- ### Get All Items:
``` bash
node script/cli.js getAll
```
This command would fetch and display all auction items from the database.

- ### Get an Item by ID:
```bash
node script/cli.js get <id>
```
Replace ```<id>``` with the actual ID of the item you want to retrieve. This command fetches and displays the auction item with the specified ID.

- ### Get an Item by Title:
```bash
node script/cli.js getByTitle <title>
```
Replace ```<title>``` with the actual title of the item you want to retrieve. This command fetches and displays the auction item with the specified title.

- ### Add a New Item:
```bash
node script/cli.js add -t "New Item" -d "Description of the new item" -s 100 -r 150
```
This command adds a new auction item with the specified title, description, start price, and reserve price.

- ### Delete an Item by ID:
```bash
node script/cli.js delete <id>
```
Replace ```<id>``` with the actual ID of the item you want to delete. This command removes the auction item with the specified ID.

## Command Structure:
- ```bash node script/cli.js <command> <options>```
- ```node script/cli.js``` runs your CLI tool using Node.js.
- ```<command>``` specifies the action you want to perform (e.g., ```seed```, ```deleteAll```, ```getAll```).
```[options]``` are additional parameters or flags required by the command (e.g., ```-t```, ```-d```, ```-s```, ```-r```).

## Bash Commands:
hese are the commands you type into your terminal to execute your CLI tool. They use the Node.js runtime to run your JavaScript code ```(script/cli.js)```.


This file contains the implementation of a function getAllItems in the auctionControllers.js file. This function is responsible for retrieving all items from the database and returning them as a JSON response.

Functionality:
The getAllItems function performs the following tasks:

Queries the database to fetch all items using the AuctionItem.find({}) method.
Returns the fetched items as a JSON response using res.json(items).
Handles any errors that occur during the database query and responds with a 500 status code along with an error message if an error occurs.
Usage:
To use this function, you can call it in your routes or endpoints to retrieve all items from the database.

Error Handling:
If an error occurs during the database query, the function will catch the error and respond with a 500 status code along with a message indicating the error: { message: 'Error fetching items' }.

Dependencies:
This function relies on the AuctionItem model, which is imported from the auctionItems.js file. Ensure that the AuctionItem model is properly defined and connected to the database before using this function.

Note:
Make sure to handle any potential errors that may arise from database connectivity issues, schema changes, or other unforeseen circumstances to ensure the reliability of this function.