const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
// const util = require('util');
const htmlGenarator = require('./generateHTML');

// const writeFileAsync = util.promisify(fs.writeFile);

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

			const htmlinfo = htmlGenarator.generateHTML(data);

			fs.writeFile('index.html', htmlinfo, function(err) {
				if (err) {
					throw err;
				} else {
					console.log('html created');
				}
			});
		});
}
