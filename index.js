const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generator = require('./generateHTML');
const pdf = require('html-pdf');
const writeFileAsync = util.promisify(fs.writeFile);

options = {
	directory   : '/tmp',
	height      : '8.7in',
	width       : '9in',
	format      : 'letter',
	orientation : 'portrait'
};

const data = {};

init();

function init() {
	return inquirer
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
		.then(function(answer) {
			data.username = answer.username;
			data.color = answer.color;

			const queryURL = `https://api.github.com/users/${data.username}`;
			return axios.get(queryURL);
		})
		.then(function(API) {
			data.profileimage = API.data.avatar_url;
			data.location = API.data.location;
			data.url = API.data.html_url;
			data.blog = API.data.blog;
			data.bio = API.data.bio;
			data.name = API.data.name;
			data.publicrepos = API.data.public_repos;
			data.followers = API.data.followers;
			data.stars = API.data.public_gists;
			data.following = API.data.following;
			data.company = API.data.company;

			console.log(data);

			const html = generator.generateHTML(data);

			return writeFileAsync('index.html', html);
		})
		.then(function() {
			console.log('Successfully wrote to index.html');

			html = generator.generateHTML(data);
			pdf.create(html, options).toFile('Github-profile.pdf');
		})
		.catch(function(err) {
			console.log(err);
		});
}
