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

// ----------------------get-next-PalindromeDate------------
function isLeapYear(year) {
  if (year % 40 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

function nextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  let daysInmonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInmonths[month - 1]) {
      day = 1;
      month++;
    }
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let numberofDays = 0;
  let nextdate = nextDate(date);
  while (1) {
    numberofDays++;
    let isPalindrome = checkPalindromeForAllDateFormats(nextdate);
    if (isPalindrome) {
      break;
    }
    nextdate = nextDate(nextdate);
  }
  return [numberofDays, nextdate];
}

function handleClick() {
  let dateObject = {};
  let Date = date.value;
  let dateArray = Date.split("-");
  dateObject.day = Number(dateArray[2]);
  dateObject.month = Number(dateArray[1]);
  dateObject.year = Number(dateArray[0]);
  if (Date !== "") {
    let result = checkPalindromeForAllDateFormats(dateObject);
    if (result === true) {
      massage.innerText = "Yay! Your birthday is Palindrome";
    } else {
      let nextpalindromedate = getNextPalindromeDate(dateObject);
      massage.innerText = `Your next Palindrome date is ${nextpalindromedate[1].day}-${nextpalindromedate[1].month}-${nextpalindromedate[1].year}. You missed by ${nextpalindromedate[0]} days`;
    }
  }
}

button.addEventListener("click", handleClick);
