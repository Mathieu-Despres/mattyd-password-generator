// passwordOptions contains all necessary string data needed to generate the password
  const passwordOptions = {
  num: "1234567890",
  specialChar: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Executes when button is clicked
let generatePassword = function () {

  // Initial state for password information
  let passInfo = "";

  // List of chosen characters
  const passChars = [];

  // Ask user for the length of their password
  let characterAmount = window.prompt("Enter the amount of characters you want for your password. NOTE: This must be between 8-128 characters");

  // If the character length doesn't match requirements, alert the user
  if (characterAmount >= 8 && characterAmount <= 128) {

    // Ask if user wants to include integers
    const getInteger = window.confirm("Would you like to include NUMBERS?");

    // If user wants to include numbers
    if (getInteger) {
      // Add numerical characters to password data 
      passInfo += passwordOptions.num;
      // Add a number to the list of chosen characters
      passChars.push(getRandomChar(passwordOptions.num));
    };

    // Ask if user wants to include special characters
    const getSpecialCharacters = window.confirm("Would you like to include SPECIAL characters?");

    // If user wants to include special characters 
    if (getSpecialCharacters) {
      // Add special characters to password data 
      passInfo += passwordOptions.specialChar;
      // Add a special character to the list of chosen characters
      passChars.push(getRandomChar(passwordOptions.specialChar));
    };

    // Ask if user wants to include lowercase characters
    const getLowerCase = window.confirm("Would you like to include LOWERCASE characters?");

    // If user wants to include lowercase characters
    if (getLowerCase) {
      // Add lowercase characters to password data 
      passInfo += passwordOptions.lowerCase;
      // Add a lowercase character to the list of chosen characters
      passChars.push(getRandomChar(passwordOptions.lowerCase));
    };

    // Ask if user wants to include uppercase characters
    const getUpperCase = window.confirm("Would you like to include UPPERCASE characters?");

    // If user wants to include uppercase characters
    if (getUpperCase) {
      // Add uppercase characters to password data 
      passInfo += passwordOptions.upperCase;
      // Add an uppercase character to the list of chosen characters
      passChars.push(getRandomChar(passwordOptions.upperCase));
    };

    // Ensure user chooses at least one option -- passInfo will be empty if they don't
    if (!passInfo) {
      // Notify user needs to select at least one option
      window.alert("You need to select at least one option, please try again!");
      // Return user back to their questions
      return generatePassword();
    };

    // While there aren't enough characters
    while (passChars.length < characterAmount) {
      // choose a random char from charInfo
      passChars.push(getRandomChar(passInfo));
    };

    // Shuffle the list of characters
    for (let i = passChars.length - 1; i > 0; i--) {
      const swapIndex = randRange(i + 1);
      const temp = passChars[i];
      passChars[i] = passChars[swapIndex];
      passChars[swapIndex] = temp;
    };

    // Return the password character list concatenated to a string
    return passChars.join("");
  }
  // If user's response is invalid
  else {
    // Alert user
    window.alert("You need to provide a valid length!");
    // Return user back to their questions

    /* Removed for testing purposes to break the endless loop. */
    // Return generatePassword();
  }
};

function getRandomChar(fromString) {
  return fromString[randRange(fromString.length)];
};

// Generate a random integer r with equal chance in  0 <= r < max.
function randRange(max) {
  const requestBytes = Math.ceil(Math.log2(max) / 8);
  if (!requestBytes) { // No randomness required
    return 0;
  };
  const maxNum = Math.pow(256, requestBytes);
  const ar = new Uint8Array(requestBytes);

  while (true) {
    window.crypto.getRandomValues(ar);

    let val = 0;
    for (let i = 0; i < requestBytes; i++) {
      val = (val << 8) + ar[i];
    };

    if (val < maxNum - maxNum % max) {
      return val % max;
    };
  };
};