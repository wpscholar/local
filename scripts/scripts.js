const {readFileSync} = require('fs');
const {resolve} = require('path');
const {globalGitStatus, gitCloneAll} = require('./functions');

const cwd = resolve(__dirname, '..');

// Run an exported node function: node -e 'require("./scripts").clone()'

module.exports = {
	/**
	 * Find all Git repos that have uncommitted changes.
	 *
	 * To run: `npm run check`
	 */
	check: () => {
		globalGitStatus('./.git/');
		globalGitStatus('content/libraries/*/*/.git/');
		globalGitStatus('content/*(mu-plugins|plugins|themes)/*/.git/');
	},
	/**
	 * Loop through the repo map and clone any repositories that don't already exist to the appropriate location.
	 */
	clone: () => { // npm run clone
		const repoMap = JSON.parse(readFileSync(`${cwd}/repositories.json`));
		for (const path in repoMap) {
			if (repoMap.hasOwnProperty(path) && repoMap[path].length) {
				gitCloneAll(`${cwd}/content/${path}`, repoMap[path]);
			}
		}
	}
};
