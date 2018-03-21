# r3fresh

r3fresh is a developer tool which reloads website resources (such as CSS, HTML and JavaScript) as they change on the server, so you are always looking at the most up-to-date version of a web page. It can make developing websites a lot faster, by helping productivity. You can install r3fresh via the [Chrome Web Store](https://chrome.google.com/webstore/detail/r3fresh/kedglhfbgkhggkbcabnggfaafboeckno).

Features:
 * Entire domains can be r3freshed
 * file:// protocol is now supported, though required "Allow access to file URLs" to be checked on the chrome extensions page.

It's recommended you use this extension only in a local development environment and not in a production environment.

## Running development version in Chrome

1. Clone this repo to your local machine. 
2. Then visit to `chrome://extensions/` in Chrome.
3. Within the Extension page, check the "Developer Mode" checkbox.
4. A button with the label "Load unpacked extension" should have appeared, click it.
5. A modal will popup with your local file system, navigate to where you cloned the repo to and click "Select".

### Handy scripts for local development

#### Build the CSS

    sass -w css/options.scss:css/options.css

#### Run the local demo folder

    php -S 127.0.0.1:8000 -t demo/

### Testing

#### Setup the enviroment

Install npm, then run:

    npm install -g grunt-cli &&
    npm install

#### Run the tests (Qunit)

    grunt qunit:all

Or drag and drop the files from `/test/index.html` into your browser.


## Footnotes

Contribute on GitHub: https://codebymick/r3fresh/

Find it in the Chrome Web Store: https://chrome.google.com/webstore/detail/codebymick/r3fresh/

Extension by: codebymick ([@codebymick] / [https://codebymick.com/](https://codebymick.com/)

r3fresh was originally based on [LiveJS](http://livejs.com/) by [@mrtnkl](https://twitter.com/mrtnkl).
