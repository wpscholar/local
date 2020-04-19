# Local WordPress Dev Environment

My local WordPress development environment.

## Requirements

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Composer](https://getcomposer.org/doc/00-intro.md)

## Installation

Run this command in the terminal:
```
composer --keep-vcs --repository-url=git@github.com:wpscholar/local.git create-project wpscholar/local
``` 

The installation process will check your environment for the required PHP version and PHP extensions. If this presents a problem and you want to force install anyway, just add the `--ignore-platform-reqs` flag to the command.

## Usage

### With Laravel Valet

- Install [Homebrew](https://brew.sh/)
- Install [Laravel Valet](https://laravel.com/docs/7.x/valet#installation)
- Install MySQL using Homebrew: `brew install mysql`
- Start MySQL using Homebrew: `brew services start mysql`
- Set password to be `root` for the root user: `$(brew --prefix mysql)/bin/mysqladmin -u root password root`
- Run `composer --keep-vcs --repository-url=git@github.com:wpscholar/local.git create-project wpscholar/local`
- Run `valet link local` (unless you've already run `valet park` and are in your Valet root directory)
- Run `valet secure local`
- Run `cd local`
- Run `composer run wp db create` - You may need to rename the database in your `.env` file first if you don't want your database to be named `local`.
- Visit `https://local.test` (unless you set a different top level domain) in the browser to finish the WordPress installation.

### With Local

- Install [Local](https://localwp.com/)
- Create a new WordPress site using the UI
- Navigate to the site's `app` directory in the terminal. 
- Run `rm -rf public` to delete the `public` directory.
- Run `composer --keep-vcs --repository-url=git@github.com:wpscholar/local.git create-project wpscholar/local public`
- Click the link in Local to visit the site in the browser.

## Configuration

Open up the `.env` file to edit database credentials or other WordPress constants.
