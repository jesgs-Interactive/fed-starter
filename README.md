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

## LICENSE
MIT License

Copyright 2019 Jess Green

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
