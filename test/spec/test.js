/*global describe, it */
'use strict';
(function () {

	function fireClick(node){
		if ( document.createEvent ) {
			var evt = document.createEvent('MouseEvents');
			evt.initEvent('click', true, false);
			node.dispatchEvent(evt);
		} else if( document.createEventObject ) {
			node.fireEvent('onclick') ;
		} else if (typeof node.onclick == 'function' ) {
			node.onclick();
		}
	}

	// some elements we need
	var form = document.getElementById("myform"),
			input = document.querySelector("input[type=text]"),
			email = document.querySelector("input[type=email]"),
			submit = document.querySelector("input[type=submit]"),
			errorExists;

	// init the validator
	var myform = new guard("myform");
	myform.validate();
	fireClick(submit);

	// Input text tests
	describe('Input text validations', function () {

		it('Empty text input should be invalid', function () {
			errorExists = input.parentNode.querySelector(".error");

			if (errorExists != null) errorExists = 1;
			else errorExists = 0;

			expect(errorExists).to.equal(1);
		});

		it('Text of 2 characters should be invalid', function () {
			input.setAttribute("value","xx");
			fireClick(submit);

			errorExists = input.parentNode.querySelector(".error");

			if (errorExists != null) errorExists = 1;
			else errorExists = 0;

			expect(errorExists).to.equal(1);
		});

		it('Text of at least 3 characters should be valid', function () {
			input.setAttribute("value","xxx");
			fireClick(submit);

			errorExists = input.parentNode.querySelector(".error");

			if (errorExists != null) errorExists = 1;
			else errorExists = 0;

			expect(errorExists).to.equal(0);
		});

	});


	// Input mail tests
	describe('Input mail validations', function () {

		it('Empty mail should be invalid', function () {
			input.setAttribute("value","");
			fireClick(submit);

			errorExists = email.parentNode.querySelector(".error");

			if (errorExists != null) errorExists = 1;
			else errorExists = 0;

			expect(errorExists).to.equal(1);
		});

		it('Wrong mail should be invalid', function () {
			email.setAttribute("value","marciobarrios@gmail.com");
			fireClick(submit);

			errorExists = email.parentNode.querySelector(".error");

			if (errorExists != null) errorExists = 1;
			else errorExists = 0;

			expect(errorExists).to.equal(1);
		});

	});
})();
