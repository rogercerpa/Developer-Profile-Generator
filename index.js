const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
inquirer
	.prompt([
		{
			type    : 'input',
			name    : 'username',
			message : 'What is your GitHub account userinput?'
		},
		{
			type    : 'list',
			name    : 'color',
			message : 'Choose one of the following colors:',
			choices : [ 'blue', 'green', 'pink', 'red' ]
		}
	])
	.then(({ username }) => {
		// const userinput =userdata.userinput.toLowerCase().split('').join('') + '.json';
		const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
		// fs.writeFile(userinput, JSON.stringify(userdata, null, '\t'), function(
		// 	err
		// ) {
		// 	if (err) {
		// 		return console.log(err);
		// 	}
		// 	console.log('success!');
		// 	axios.get(queryUrl).then(function(res) {
		// 		console.log(res.data);
		// 	});
		// });
		axios.get(queryUrl).then(function(res) {
			const repoInfo = res.data.map(function(repo) {
				return repo.name;
			});
			console.log(repo.name);
		});
	});

// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() {

// init();
