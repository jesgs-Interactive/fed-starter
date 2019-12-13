Frontend Starter Project Template
---

Starter project for quickly generating static html files to be used for integration into backend systems (Laravel, WordPress, etc).

This project uses Nunjucks for the templating language, which was chosen due to its similarity to Twig.

Requires:
* Node.JS >= 8.9.1

Uses:
* Gulp v4.0
* Sass v4.0
* Bourbon v6.0 (Neat is included but not used)

Run `npm install` to install all dependencies.

### Development

To run servers:

`npm run serve` for development server.

`npm run serve-styleguide` to view styleguide.

To run watch task: `gulp watch`

Working directories are:
* /assets: Images, JS, and SCSS files
* /static/templates: Nunjucks templates that are compiled into static HTML files under `static/html`

`assets/styles/screen.css`, and `assets/images` folder are copied to both the `static/html` folder and the `styleguide` folder. Both folders are ignored by Git.