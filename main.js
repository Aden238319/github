function DropDown(dropDown) { // Creates Constructor/Dropdown Function
  const [toggler, menu] = dropDown.children; // Declares new function (Toggler, Menu)
  
  const handleClickOut = e => {
    if(!dropDown) {
      return document.removeEventListener('click', handleClickOut);
    }
    
    if(!dropDown.contains(e.target)) {
      this.toggle(false);
    }
  };
  
  const setValue = (item) => {
    const val = item.textContent;
    toggler.textContent = val;
    this.value = val;
    this.toggle(false); // Creates Flag
    dropDown.dispatchEvent(new Event('change'));
    toggler.focus();
  }
  
  const handleItemKeyDown = (e) => {
    e.preventDefault();

    if(e.keyCode === 38 && e.target.previousElementSibling) { // up
      e.target.previousElementSibling.focus();
    } else if(e.keyCode === 40 && e.target.nextElementSibling) { // down
      e.target.nextElementSibling.focus();
    } else if(e.keyCode === 27) { // escape key
      this.toggle(false);
    } else if(e.keyCode === 13 || e.keyCode === 32) { // enter or spacebar key
      setValue(e.target);
    }
  }

  const handleToggleKeyPress = (e) => {
    e.preventDefault();

    if(e.keyCode === 27) { // Looks for "ESC" key input from user
      this.toggle(false);
    } else if(e.keyCode === 13 || e.keyCode === 32) { // Looks for "SPACE or BACKSPACE" input from user
      this.toggle(true);
    }
  }
  // Creates keyboard accessibility and checks for user input. 
  toggler.addEventListener('keydown', handleToggleKeyPress);
  toggler.addEventListener('click', () => this.toggle());
  [...menu.children].forEach(item => {
    item.addEventListener('keydown', handleItemKeyDown);
    item.addEventListener('click', () => setValue(item));
  });
  
  this.element = dropDown;
  
  this.value = toggler.textContent;
  // Creates flag and checks if 'aria-expanded' is true.
  this.toggle = (expand = null) => {
    expand = expand === null 
      ? menu.getAttribute('aria-expanded') !== 'true'
      : expand;

    menu.setAttribute('aria-expanded', expand);
    // If flag is true, will expand and conduct the following
    if(expand) {
      toggler.classList.add('active');
      menu.children[0].focus();
      document.addEventListener('click', handleClickOut);
      dropDown.dispatchEvent(new Event('opened'));
    } else {
      toggler.classList.remove('active');
      dropDown.dispatchEvent(new Event('closed'));
      document.removeEventListener('click', handleClickOut);
    }
  }
}

const dropDown = new DropDown(document.querySelector('.dropdown'));
  
dropDown.element.addEventListener('change', e => {
  console.log('changed', dropDown.value);
});

dropDown.element.addEventListener('opened', e => {
  console.log('opened', dropDown.value);
});

dropDown.element.addEventListener('closed', e => {
  console.log('closed', dropDown.value);
});

dropDown.toggle();

// Declares "isValidEmail" function 
const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Uses chromiam regular expression for basic validation
  return re.test(String(email).toLowerCase());
};
// Declares following functions
const form = document.querySelector("form"); 
const thankYou = document.querySelector(".thank-you");
const nameInput = document.querySelector(
  'input[name="name"]'
);
const emailInput = document.querySelector(
  'input[name="email"]'    
);
const messageInput = document.querySelector(
  'textarea[name="message"]'    
);

const inputs = [nameInput, emailInput, messageInput];

let isFormValid = false;
let isValidationOn = false;
// Creates "element" function 
const resetElm = (elm) => {
  elm.classList.remove("invalid");
  elm.nextElementSibling.classList.add("hidden");
};

const invalidateElm = (elm) => {
  elm.classList.add("invalid");
  elm.nextElementSibling.classList.remove("hidden");
}

const validateInputs = () => {
  if (!isValidationOn) return;

  isFormValid = true;
  inputs.forEach(resetElm)

  if (!nameInput.value) {
  isFormValid = false;
  invalidateElm(nameInput);
  }

  if (!isValidEmail(emailInput.value)) {
      isFormValid = false;
      invalidateElm(emailInput);
      }

if (!messageInput.value) {
  isFormValid = false;
  invalidateElm(messageInput);
}
};
// Creates submit functionality, when submit is clicked will:
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Will prevent default website behaviour
  validateInputs(); // Refers to validation function
  isValidationOn = true; 
  if (isFormValid) { // Checks if form is valid, if is valid,
  form.remove(), // Will remove form.
  thankYou.classList.remove("hidden"); // Will print thankyou message. 
  }
});

inputs.forEach(input => {
  Input.addEventListener("input", () => {
      validateInputs();
  });
});


