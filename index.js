const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const elTimezone = document.getElementById("timezone");
const elTime = document.getElementById("time");
const elDate = document.getElementById("date");
const elWeekday = document.getElementById("weekday");

const monthsArray = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const weekArray = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

window.addEventListener("load", () => {
    dataHandler.getData();
    dataHandler.displayData();
})


let dataHandler = {
    timezone: '',
    time: '',
    weekday: '',
    date: '',
    getData: function() {
        this.getTimezone();
        this.getTime();
        this.getWeekday();
        this.getDate();
    },
    getTimezone: function() {
        let userTimezone = dayjs.tz.guess()
        this.timezone = this.formatTimezone(userTimezone);
    },
    formatTimezone: function(tz) {
        tz = tz.replace("_", " ");
        tz = tz.replace("/", " - ");
        return tz;
    },
    getTime: function() {
        let hours = String(dayjs().hour());
        let minutes = String(dayjs().minute());
        let seconds = String(dayjs().second());

        this.time = this.formatTime(hours, minutes, seconds);
    },
    formatTime: function(hours, minutes, seconds) {
        let timeArray = [hours, minutes, seconds];
        for (i in timeArray) {
            if (timeArray[i].length < 2) {
                timeArray[i] = `0${timeArray[i]}`;
            }
        }
        hours = timeArray[0];
        minutes = timeArray[1];
        seconds = timeArray[2];

        return `${hours}:${minutes}:${seconds}`;
    },
    getWeekday: function() {
        let dayOfWeek = dayjs().day();
        dayOfWeek = weekArray[dayOfWeek];
    
        let userWeekday = dayOfWeek;
        this.weekday = userWeekday;
    },
    getDate: function() {
        dayOfMonth = dayjs().date();
        monthNumber = dayjs().month();
        month = monthNumber;
        month = monthsArray[month];
        year = dayjs().year();
        
        this.date = this.formatDate(dayOfMonth, month, year);
    },
    formatDate: function(day, month, year) {
        if (String(day).length < 2) {
            day = `0${day}`;
        }
        return `${month} ${day}, ${year}`;
    },
    displayData: function() {
        elTimezone.textContent = this.timezone;
        elTime.textContent = this.time;
        elDate.textContent = this.date;
        elWeekday.textContent = this.weekday;
    },
}

const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");
const timezoneContainer = document.getElementById("timezone-select");

const timezoneList = Intl.supportedValuesOf('timeZone');

for (i of timezoneList) {
    let option = document.createElement('option');
    option.setAttribute("value", i);
    option.textContent = i;
    timezoneContainer.appendChild(option);

}

openModal.addEventListener("click", () => modal.showModal());

closeModal.addEventListener("click", (e) => {
    modal.close();
    changeTimezone();
});

function changeTimezone() {
    currentTimezone = timezoneContainer.value;
    updateDisplay(currentTimezone);
}

function updateDisplay(tz) {
    let dateObj = dayjs(`${year}-${monthNumber + 1}-${dayOfMonth} ${elTime.textContent}`).tz(tz);
    let updatedYear = dateObj.$y;
    let updatedMonth = monthsArray[dateObj.$M];
    let updatedDay = dateObj.$D;

    let updatedHours = dateObj.$H;
    let updatedMinutes = dateObj.$m;
    let updatedSeconds = dateObj.$s;


    if (String(updatedDay).length < 2) {
        updatedDay = `0${updatedDay}`;
    }
    if (String(updatedSeconds).length < 2) {
        updatedSeconds = `0${updatedSeconds}`;
    }
    if (String(updatedMinutes).length < 2) {
        updatedMinutes = `0${updatedMinutes}`;
    }
    if (String(updatedHours).length < 2) {
        updatedHours = `0${updatedHours}`;
    }

    let updatedDate = `${updatedMonth} ${updatedDay}, ${updatedYear}`;
    let updatedTime = `${updatedHours}:${updatedMinutes}:${updatedSeconds}`;

    if (elTime.textContent != updatedTime) {
        elTime.textContent = updatedTime;
    }
    
    if (elDate.textContent != updatedDate) {
        elDate.textContent = updatedDate;
    }
    
    tz = tz.replace("_", " ");
    tz = tz.replace("/", " - ");
    elTimezone.textContent = tz;
}