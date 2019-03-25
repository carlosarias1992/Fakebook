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
        return <option value={idx} key={idx}>{month}</option>;
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