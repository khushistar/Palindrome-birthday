const date = document.querySelector("#birth-date");
const button = document.querySelector("#show-button");
const massage = document.querySelector("#output");

function ConvertingDateToString(date) {
  let dateObject = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateObject.day += "0" + date.day;
  } else {
    dateObject.day += date.day;
  }
  if (date.month < 10) {
    dateObject.month += "0" + date.month;
  } else {
    dateObject.month += date.month;
  }
  dateObject.year += date.year;

  return dateObject;
}

function getAllDateFormates(date) {
  let convertedDate = ConvertingDateToString(date);
  console.log(convertedDate);
  let DDMMYYYY = convertedDate.day + convertedDate.month + convertedDate.year;
  let MMDDYYYY = convertedDate.month + convertedDate.day + convertedDate.year;
  let YYYYMMDD = convertedDate.year + convertedDate.month + convertedDate.day;
  let DDMMYY =
    convertedDate.day + convertedDate.month + convertedDate.year.slice(2);
  let MMDDYY =
    convertedDate.month + convertedDate.day + convertedDate.year.slice(2);
  let YYMMDD =
    convertedDate.year.slice(2) + convertedDate.month + convertedDate.day;
  return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];
}

function ReverseString(string) {
  let stringToArr = string.split("");
  let reversestring = stringToArr.reverse();
  return reversestring.join("");
}

function checkPalindromeForAllDateFormats(date) {
  let ArrayOfDateStrings = getAllDateFormates(date);
  console.log(ArrayOfDateStrings);
  let isPalindrome = false;
  for (let i = 0; i < ArrayOfDateStrings.length; i++) {
    let reversedString = ReverseString(ArrayOfDateStrings[i]);
    if (reversedString === ArrayOfDateStrings[i]) {
      isPalindrome = true;
      break;
    }
  }
  return isPalindrome;
}

function handleClick() {
  let dateObject = {};
  let Date = date.value;
  let dateArray = Date.split("-");
  console.log(dateArray);
  dateObject.day = Number(dateArray[2]);
  dateObject.month = Number(dateArray[1]);
  dateObject.year = Number(dateArray[0]);
  console.log(dateObject);
  if (Date !== "") {
    let result = checkPalindromeForAllDateFormats(dateObject);
    if (result === true) {
      massage.innerText = "Yay! Your birthday is Palindrome";
    } else {
      console.log("birthday is not palindrome");
    }
  }
}

button.addEventListener("click", handleClick);
