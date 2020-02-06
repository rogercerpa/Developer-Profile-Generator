const inquirer = require('inquirer');
const fs = require('fs');
inquirer
	.prompt([
		{
			type    : 'input',
			name    : 'username',
			message : 'What is your GitHub account username?'
		},
		{
			type    : 'list',
			name    : 'color',
			message : 'Choose one of the following colors:',
			choices : [ 'blue', 'green', 'pink', 'red' ]
		}
	])
	.then((userdata) => {
		const username = userdata.username;
		const usercolor = userdata.color;
		fs.writeFile(username, JSON.stringify(userdata, null, '\t'), function(err) {
			if (err) {
				return console.log(err);
			}
			console.log('success!');
		});
	});

// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() {

// init();
