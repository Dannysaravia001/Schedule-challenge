// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
  // Define the current hour using Day.js
  var currentHour = dayjs().hour();

  // Add a click event listener to all elements with the class "saveBtn"
  $(".saveBtn").on("click", function() {
    // Get the user input from the textarea inside the same time-block
    var userInput = $(this).siblings(".description").val();

    // Get the ID of the parent time-block element
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Use the timeBlockId as the key to save the user input in local storage
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply past, present, or future classes to time-blocks based on the current hour
  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var blockHour = parseInt(timeBlockId.split('-')[1]);

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Retrieve and display user input from local storage
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var storedInput = localStorage.getItem(timeBlockId);

    if (storedInput !== null) {
      $(this).find(".description").val(storedInput);
    }
  });

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});