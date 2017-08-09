$(function () {
  // Grab the template script
  var theTemplateScript = $("#test-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
    "front-end-dev": "supersultry",
    "back-end-dev": "Tsumuji"
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.handlebars-test').html(theCompiledHtml);
});