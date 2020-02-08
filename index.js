const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// const writeFileAsync = util.promisify(fs.writeFile);

async function githubinfo() {
	try {
		const { username } = await inquirer.prompt([
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
		]);

		const { data } = await axios.get(
			`https://api.github.com/users/${username}`
		);

		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
githubinfo();
// 	.then(function(answers) {
// 		const html = generateHTML(answers);
// 		return writeFileAsync('index.html', html);
// 	})
// 	.then(function() {
// 		console.log('html created');
// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});

// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() {

// init();
