import React from 'react';

export const monthOptions = () => {
    const months = [
        "Month", 
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
        "December"
    ];

    const options = months.map((month, idx) => {
        return <option value={idx - 1} key={idx}>{month}</option>;
    });

    return options;
};

export const dayOptions = () => {
    let options = [<option value="0" key="0">Day</option>];

    for(let day = 1; day <= 31; day++) {
        options.push(<option value={day} key={day}>{day}</option>);
    }

    return options;
};

export const yearOptions = () => {
    const thisYear = new Date().getFullYear();
    let options = [<option value="0" key="0">Year</option>];

    for (let year = thisYear; year >= 1905; year--) {
        options.push(<option value={year} key={year}>{year}</option>);
    }

    return options;
};

export const addSignupErrorClass = element => {
    const parentElement = element.parentElement;
    const inputElement = parentElement.children[1];
    const icon = parentElement.children[2];

    inputElement.className += " input-error";
    icon.className += " error-icon";
}

export const removeSignupErrorClass = element => {
    const parentElement = element.parentElement;
    const inputElement = parentElement.children[1];
    const icon = parentElement.children[2];

    const inputClass = inputElement.className.split(" ")[0];
    inputElement.className = inputClass;

    icon.className = "";
}

export const toggleErrorDisplay = (parentElement, displayProperty) => {
    const display = parentElement.children[0];
    const displayClass = display.className.split(" ");

    display.className = displayClass[0] + " " + displayProperty;
}

export const errorModal = displayValue => {
    return (e) => {
        const element = e.target;

        if (element.value === "") {
            toggleErrorDisplay(element.parentElement, displayValue);
        }
    };
}