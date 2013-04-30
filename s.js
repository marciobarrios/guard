/**
 * Closure to ensure the integrity of the code
 *
 * Objective: take advantage of HTML5 forms and generate fallback for older
 * browsers creating a small polyfill (of course this is a very limited example)
 */
(function(w, d){
  "use strict";

  // helper to test for attribute support
  function supportsAttr(el, attr) {
    return attr in d.createElement(el);
  }

  // helper to attach events
  function addEvent(evnt, elem, func) {
     if (elem.addEventListener)  // W3C DOM
      elem.addEventListener(evnt,func,false);
     else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+evnt, func);
    }
    else {
      elem[evnt] = func;
    }
  }

  // helper to detect an email
  function is_email(value){
    return (/^([a-z0-9])(([-a-z0-9._+])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/).test(value);
  }

  // helper to find elements with a certain attribute
  function getAllElementsWithAttribute(attribute) {
    var matchingElements = [],
    allElements = d.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
      if (allElements[i].getAttribute(attribute)) {
        // Element exists with attribute. Add to array.
        matchingElements.push(allElements[i]);
      }
    }
    return matchingElements;
  }

  //default messages (one message for every input type),
  // here we could even deal with some kind of i18n
  var defaultMessages = {
    "text": "Please fill this field with at least 3 characters",
    "email": "Please fill this field with a correct email address"
  };


  /**
   * Guard constructor
   *
   * @param  {string} elem, id of the form to validate
   * @param  {object} messages, object with messages (optional)
   */
  var guard = function(elem, messages) {
    this.elem = d.getElementById(elem);
    this.messages = messages || defaultMessages;
  }

   /**
    * Checks if the browser supports HTML5 forms and init the validator
    */
   guard.prototype.validate = function(){

    var elem = this.elem,
        messages = this.messages,
        showError = this.showMessages;

    // Capture the submit event to check the errors
    addEvent("submit", elem, function(event) {

      // list of elements with requiered attribute
      var inputs = getAllElementsWithAttribute("data-required"),
          validForm = true;

      for (var i = 0, inputsLength = inputs.length; i < inputsLength; i++){
        var type = inputs[i].getAttribute("type"),
            min = inputs[i].getAttribute("data-minlength"),
            valid = true;

        if (supportsAttr("input", "required")) { // HTML5 forms
          if ( !inputs[i].checkValidity() ) {
            valid = false; // for a form element
            validForm = false; // for the entire form
          }

          // Manage the message
          showError(inputs[i], messages[type], valid);
        }
        else { // small and incomplete polyfill for older browsers

          var val = inputs[i].value;

          if ( type == "text" ) {
            if ( val == "" || val.length < parseInt(min) ) {
              valid = false;
              validForm = false;
            }
          }
          else if ( type == "email" && !is_email(val) ) {
            valid = false;
            validForm = false;
          }

          // Manage the message
          showError(inputs[i], messages[type], valid);
        }

      }

      if ( !validForm ) {
        // Let's stop the form submission
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
      }

    });

  }

  /**
   * Shows/removes messages
   *
   * @param {object} elem
   * @param {string} text
   * @param {bool} valid
   */
  guard.prototype.showMessages = function(elem, text, valid) {

    var errorContainer = elem.parentNode.getElementsByClassName("error");

    // if there is an error, I create the container only if it doesn't exists
    if (!valid) {
      if ( errorContainer.length ) { // there is an error with an existing container
        errorContainer[0].innerHTML = text;
      }
      else { // there is an error without an existing container
        var span = d.createElement("span");
        span.className = "error";
        span.appendChild(d.createTextNode(text));

        elem.parentNode.appendChild(span);
      }
    }
    else { // if there is not error, I delete the message if exists
      if ( errorContainer.length ) {
        elem.parentNode.removeChild(errorContainer[0]);
      }
    }

  }

  // Expose it!
  w.guard = guard;

})(this, this.document);
