import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const tableDays = document.querySelector('span[data-days]');
const tableHours = document.querySelector('span[data-hours]');
const tableMinutes = document.querySelector('span[data-minutes]');
const tableSeconds = document.querySelector('span[data-seconds]');



startBtn.disabled = true;

let targetDate;
let timerId = null;
let currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    if (selectedDates[0] < currentDate) {

      Notiflix.Notify.failure('Please choose a date in the future');
    } else {

      startBtn.disabled = false;
      targetDate = selectedDates[0];
      
    }
    console.log(selectedDates[0].getTime());
  },
};

startBtn.addEventListener("click", countdown);

flatpickr('#datetime-picker', options);

console.log('hello world');

function countdown () {

     timerId = setInterval(() => {

      let date = new Date();
        
        const {days,hours,minutes,seconds} =  convertMs(targetDate.getTime()-date.getTime());
        
        if (targetDate.getTime() - date.getTime() < 920) {
          clearInterval(timerId);
      }
        
        tableDays.textContent = addLeadingZero(days);
        tableHours.textContent =  addLeadingZero(hours);
        tableMinutes.textContent = addLeadingZero(minutes);
        tableSeconds.textContent = addLeadingZero(seconds);
           
       
    },1000);

    
}

 function addLeadingZero(value) {

     return value.toString().padStart(2,"0");
 }


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }