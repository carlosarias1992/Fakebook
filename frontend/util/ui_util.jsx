import React from "react";

export const monthOptions = () => {
  const months = [
    "Month",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const options = months.map((month, idx) => {
    return (
      <option value={idx - 1} key={idx}>
        {month}
      </option>
    );
  });

  return options;
};

export const dayOptions = () => {
  let options = [
    <option value="0" key="0">
      Day
    </option>,
  ];

  for (let day = 1; day <= 31; day++) {
    options.push(
      <option value={day} key={day}>
        {day}
      </option>
    );
  }

  return options;
};

export const yearOptions = () => {
  const thisYear = new Date().getFullYear();
  let options = [
    <option value="0" key="0">
      Year
    </option>,
  ];

  for (let year = thisYear; year >= 1905; year--) {
    options.push(
      <option value={year} key={year}>
        {year}
      </option>
    );
  }

  return options;
};

export const addSignupErrorClass = (element) => {
  const parentElement = element.parentElement;
  const inputElement = parentElement.children[1];
  const icon = parentElement.children[2];

  inputElement.className += " input-error";
  icon.className += " error-icon";
};

export const removeSignupErrorClass = (element) => {
  const parentElement = element.parentElement;
  const inputElement = parentElement.children[1];
  const icon = parentElement.children[2];

  const inputClass = inputElement.className.split(" ")[0];
  inputElement.className = inputClass;

  icon.className = "";
};

export const toggleErrorDisplay = (parentElement, displayProperty) => {
  const display = parentElement.children[0];
  const displayClass = display.className.split(" ");

  display.className = displayClass[0] + " " + displayProperty;
};

export const removeClass = (element, className) => {
  const prevClass = element.className.split(" ");
  const newClass = [];

  for (let i = 0; i < prevClass.length; i++) {
    if (className !== prevClass[i]) {
      newClass.push(prevClass[i]);
    }
  }

  element.className = newClass.join(" ");
};

export const addClass = (element, className) => {
  if (!element.className.includes(className)) {
    const allClasses = element.className.split(" ");
    allClasses.push(className);
    element.className = allClasses.join(" ");
  }
};

export const errorModal = (displayValue) => {
  return (e) => {
    const element = e.target;

    if (element.value === "") {
      toggleErrorDisplay(element.parentElement, displayValue);

      if (displayValue === "show") {
        removeSignupErrorClass(element);
      } else {
        addSignupErrorClass(element);
      }
    }
  };
};

export const validEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,5})+$/.test(email);
};

export const toggleClass = (selector, className) => {
  return () => document.querySelector(selector).classList.toggle(className);
};

const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthNumber];
};

const getTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let timeOfDay = "AM";

  if (hours > 12) {
    hours = hours - 12;
    timeOfDay = "PM";
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes} ${timeOfDay}`;
};

export const getTimeString = (created_at) => {
  const month = created_at.getMonth();
  const day = created_at.getDate();
  const time = getTime(created_at);
  const presentYear = new Date().getFullYear();
  let postYear = created_at.getFullYear();
  let dateEnding;

  dateEnding = postYear === presentYear ? ` at ${time}` : `, ${postYear}`;
  return getMonthName(month) + " " + day + dateEnding;
};

export const autoGrow = (e) => {
  const element = e.target;
  element.style.cssText = "height:" + element.scrollHeight + "px";
};

export const autoGrowSelector = (selector) => {
  const element = document.querySelector(selector);
  element.style.cssText = "height:" + element.scrollHeight + "px";
};

export const findFriendRequestByUserId = (
  id,
  currentUserId,
  friendRequests
) => {
  const keys = Object.keys(friendRequests);

  for (let i = 0; i < keys.length; i++) {
    if (
      parseInt(friendRequests[keys[i]].sender_id) === id &&
      parseInt(friendRequests[keys[i]].receiver_id) === currentUserId
    ) {
      return friendRequests[keys[i]];
    } else if (
      parseInt(friendRequests[keys[i]].receiver_id) === id &&
      parseInt(friendRequests[keys[i]].sender_id) === currentUserId
    ) {
      return friendRequests[keys[i]];
    }
  }
};

export const findAllFriendRequestsByUserId = (id, allFriendRequests) => {
  const keys = Object.keys(allFriendRequests);
  const friendRequests = [];

  for (let i = 0; i < keys.length; i++) {
    if (
      parseInt(allFriendRequests[keys[i]].sender_id) === id ||
      parseInt(allFriendRequests[keys[i]].receiver_id) === id
    ) {
      friendRequests.push(allFriendRequests[keys[i]]);
    }
  }

  return friendRequests;
};

export const getShortTimeString = (created_at) => {
  const commentsDate = new Date(created_at);
  const todaysDate = new Date();
  const yearDifference = todaysDate.getFullYear() - commentsDate.getFullYear();
  const monthDifference = todaysDate.getMonth() - commentsDate.getMonth();
  const dayDifference = todaysDate.getDate() - commentsDate.getDate();
  const hourDifference = todaysDate.getHours() - commentsDate.getHours();
  const minuteDifference = todaysDate.getMinutes() - commentsDate.getMinutes();
  const secondDifference = todaysDate.getSeconds() - commentsDate.getSeconds();

  if (yearDifference !== 0) {
    return `${yearDifference}y`;
  } else {
    if (monthDifference !== 0) {
      return `${monthDifference}m`;
    } else {
      if (dayDifference !== 0) {
        return `${dayDifference}d`;
      } else {
        if (hourDifference !== 0) {
          return `${hourDifference}h`;
        } else {
          if (minuteDifference !== 0) {
            return `${minuteDifference}m`;
          } else {
            if (secondDifference !== 0) {
              return `${secondDifference}s`;
            } else {
              return "now";
            }
          }
        }
      }
    }
  }
};

export const scrollToFarRight = (selector) => {
  const element = document.querySelector(selector);
  if (element) element.scrollLeft = element.scrollWidth;
};

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const removeFromArray = (array, idx) => {
  const firstHalf = array.slice(0, idx);
  const secondHalf = array.slice(idx + 1);

  return firstHalf.concat(secondHalf);
};
