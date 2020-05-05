const chalk = require('chalk');
const {execSync} = require('child_process');
const {existsSync, lstatSync} = require('fs');
const glob = require('glob');

/**
 * Fetch the origin URL for a Git repository.
 * @param path
 * @returns {string}
 */
function fetchGitOriginUrl(path) {
	return isGitRepository(path) ? runCommand('git config --get remote.origin.url', {cwd: path}) : '';
}

/**
 * Get a collection of paths that match a glob pattern.
 *
 * @link https://www.npmjs.com/package/glob
 *
 * @param {string} pattern The glob pattern
 * @param {object} options The glob options.
 *
 * @returns {array}
 */
function getPaths(pattern, options = {}) {
	return glob.sync(pattern, options);
}

/**
 * Clone a git repo.
 *
 * @param {string} repo
 * @param {string} path
 *
 * @returns {string}
 */
function gitClone(repo, path) {
	return runCommand(`git clone ${repo}`, {cwd: path});
}

/**
 * Clone a collection of git repos.
 *
 * @param {string} dir
 * @param {array} repos
 */
function gitCloneAll(dir, repos) {
	const existingRepos = getPaths('content/*(mu-plugins|plugins|themes)/*/.git/')
		.map(path => path.slice(0, -6))
		.map(path => fetchGitOriginUrl(path));

	repos.forEach(repo => {
		const packageName = gitUrlToPackageName(repo);
		if (existingRepos.includes(repo)) {
			console.log(chalk.green(packageName));
			console.log(chalk.hex('#A9A9A9').visible('Already exists. Skipping...'));
		} else {
			console.log(chalk.red(packageName));
			console.log(chalk.hex('#A9A9A9').visible(gitClone(repo, dir)));
		}
	});
}

/**
 * Convert a Git URL into a package name.
 *
 * @param {string} url
 *
 * @returns {string}
 */
function gitUrlToPackageName(url) {
	if (url.startsWith('git@')) {
		return url.slice(15, -4);
	}
	if (url.startsWith('https')) {
		return url.slice(19, -4);
	}
	return '';
}

/**
 * Check paths for changes to any Git repo.
 *
 * @param {string} pattern
 */
function globalGitStatus(pattern = '**/.git/') {
	getPaths(pattern)
		.map(path => path.slice(0, -6))
		.map(path => {
			let result = runGitCommand('git status --porcelain', path);
			if (result && result.length) {

				const repo = gitUrlToPackageName(fetchGitOriginUrl(path));
				const branch = runGitCommand('git rev-parse --abbrev-ref HEAD', path);
				const changes = runGitCommand('git status -s', path);

				console.log(chalk.red(repo) + ' on branch ' + chalk.green(branch) + ' in ' + chalk.hex('#A9A9A9').visible(path));
				console.log(chalk.hex('#A9A9A9').visible(changes));
			}
		});
}

/**
 * Check if a path is a directory.
 *
 * @param {String} path
 * @returns {boolean}
 */
function isDirectory(path) {
	return lstatSync(path).isDirectory();
}

/**
 * Check if a path is a Git repository.
 *
 * @param {String} path
 * @returns {boolean}
 */
function isGitRepository(path) {
	return isDirectory(path) && existsSync(`${path}/.git`);
}

/**
 * Check if a URL is a Git URL.
 *
 * Matches:
 *  - HTTP: https://github.com/wpscholar/satis.git
 *  - SSH:  git@github.com:wpscholar/satis.git
 *
 * @param url
 * @returns {boolean|*}
 */
function isGitUrl(url) {
	return url.endsWith('.git') && url.includes('github.com')
}

/**
 * Convert a package name into a Git URL.
 *
 * @param {String} name Name of the package (e.g. wpscholar/satis)
 * @param {String} type Type of URL (e.g. ssh or https, defaults to ssh)
 *
 * @returns {String} The full Git URL (e.g. git@github.com:wp-wpscholar/satis)
 */
function packageNametoGitUrl(name, type = 'ssh') {
	return type.toLowerCase() === 'ssh' ? `git@github.com:${name}.git` : `https://github.com/${name}.git`;
}

/**
 * Run a shell command.
 *
 * @param {string} command The command to run.
 * @param {object} options The options to pass to execSync.
 *
 * @returns {string} The output after running the command.
 */
function runCommand(command, options = {}) {
	return execSync(command, options).toString().trim();
}

/**
 * Run a git command.
 *
 * @param {string} command
 * @param {string} path
 * @returns {string}
 */
function runGitCommand(command, path) {
	return isGitRepository(path) ? runCommand(command, {cwd: path}) : `"${path}" is not a Git repository!`;
}

module.exports = {
	chalk,
	fetchGitOriginUrl,
	getPaths,
	gitClone,
	gitCloneAll,
	gitUrlToPackageName,
	globalGitStatus,
	isDirectory,
	isGitRepository,
	isGitUrl,
	packageNametoGitUrl,
	runCommand,
	runGitCommand
};
