#Guard, a simple form validator

The objective was to use HTML5 Form API to take advantage of the new attributes (required, pattern, placeholder) and methods (checkValidity), and create a small polyfill for older browsers. Of course this example is very limited, but you can have an idea of what I tried to achieve.

You can check it out here: http://marciobarrios.com/guard

I've made some tests to ensure the validator it works as I expected. Using PhantomJS and Mocha is really nice to run tests directly in the command line. You only need to open test/index.html to run the tests in the browsers or if you prefer command line:

1. Install node package: npm install -g mocha-phantomjs
2. mocha-phantomjs test/index.html

Author: Marcio Barrios ~ [marciobarrios.com](http://marciobarrios.com) ~ @marciobarrios
