/*
The process:

Step 1: Select all the chat components

    To do so, the data-chat attribute will be used
    this helps to select not only the chat components but the image attachments too

Step 2: Initially make the chat items invisibile 

    The left chats and special chats will be moved away of the screen to the left. 
    The right chats and the attachments will be moved to the right.
    Also, all items will be scaled to 0 and their opacity is set to be 0.
    
Step 3: Show the chat items after the delay specified by the data-chat value

    Loop over the chatElements NodeList. Irrespective of the direction, the chat elements 
    are brought in the UI. A delay is applied by the data-chat value multiplied by a delayFactor.

    delayFactor will be calculated by the method of trial and error.

    To get the delay value - the dataset method will be used
 
*/

const DELAY_FACTOR = 300;

// IIFE - so that it loads exactly when the js file is read by the index.html
// this removes the unnecessary event listening for a small function like this
(function () {
  // Set chat DOM elements - Step 1
  const chatElements = document.querySelectorAll("[data-chat]");

  // loop over the chat items and set them as invisible - Step 2
  chatElements.forEach(hideChatElement);

  //   loop over the chat items and bring them to UI - Step 3
  chatElements.forEach(showChatElement);
})();

// functions
function hideChatElement(element) {
  const { tagName, classList } = element;

  // make sure the elements are not null
  if (!tagName || !element) return;

  if (classList.contains("chat--left") || classList.contains("chat--special")) {
    element.style.transform = "translateX(-100%)";
  } else {
    element.style.transform = "translateX(100%)";
  }
  element.style.opacity = 0;
  element.style.scale = 0;
  element.style.transition = "all";
}

function showChatElement(element) {
  // UI display delay
  const duration = element.dataset["chat"];
  const timer = setTimeout(() => {
    element.style.transform = "translateX(0)";
    element.style.opacity = 1;
    element.style.scale = 1;
    element.style.transition = "none";
  }, DELAY_FACTOR * Number(duration));

  return () => clearTimeout(timer);
}
