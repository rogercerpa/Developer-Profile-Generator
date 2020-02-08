const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');

githubinfo();

async function githubinfo() {
	try {
		const { username } = await inquirer.prompt([
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
		]);
		console.log(username);

		const { data } = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=100`
		);

		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() {

// init();
