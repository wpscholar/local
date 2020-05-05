const {globalGitStatus, gitCloneAll} = require('./functions');

const repoMap = {
	'mu-plugins': [
		'git@github.com:bluehost/lambda-bluehost-generate-screenshot.git',
		'git@github.com:bluehost/lambda-bluehost-github-release-api.git',
		'git@github.com:bluehost/lambda-bluehost-plugin-zip.git',
		'git@github.com:bluehost/lambda-bluehost-screenshot-service.git',
		'git@github.com:wp-forge/wp-geo-query.git',
	],
	'plugins': [
		'git@github.com:bluehost/bluehost-wordpress-plugin.git',
	],
	'themes': []
};

// Run an exported node function: node -e 'require("./scripts").clone()'

module.exports = {
	/**
	 * Find all Git repos that have uncommitted changes.
	 *
	 * To run: `npm run check`
	 */
	check: () => {
		globalGitStatus('./.git/');
		globalGitStatus('content/*(mu-plugins|plugins|themes)/*/.git/');
	},
	/**
	 * Loop through the repo map and clone any repositories that don't already exist to the appropriate location.
	 */
	clone: () => { // npm run clone
		for (const dir in repoMap) {
			if (repoMap[dir].length) {
				gitCloneAll(`${__dirname}/content/${dir}`, repoMap[dir]);
			}
		}
	}
};
