/**
 * Description :
 * transforms the selected hour into alarm
 * 
 * @param {string} selectedHour the selected hour value
 * @return {Date} alarm in date format
 */
const transformHourToDate=(selectedHour)=>{

    const selectedTime = selectedHour;  // GET selected hour from param selectedHour
    const currentTime = new Date();     // initialise current date 

    // Store the hour to variable hour
    // Store minutes to variable minutes
    const [hours, minutes] = selectedTime.split(":");

    // create a date with hour and minutes selected
    // create a today date starting at 00:00:00
    const selectedDateTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, hours, minutes);
    const midnightToday  = new Date(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), selectedDateTime.getDate() + 0, 0, 0);

    // adds the selected hours in date format at midnightToday
    // adds the selected minutes in date format at midnightToday
    midnightToday.setHours(midnightToday.getHours() + (selectedDateTime.getHours()) );
    midnightToday.setMinutes(midnightToday.getMinutes() + selectedDateTime.getMinutes() );

    const alarm = midnightToday;  // store alarm in alarm

    return alarm ;
}

/**
 * Description :
 * converts the selected time into a countdown
 * 
 * @param {Date} selectedTime is the selected time
 * @return {string} the countdown
 */
const countdown = (selectedTime)=>{

    const targetDate = new Date(selectedTime);  // convert selectedTime into date format
    const currentDate = new Date();  // current date

    // GET countdown (selected time - current date)
    const countdown = targetDate.getTime() - currentDate.getTime();

    // Check if the value is superior than 0
    if (countdown > 0) {

        // Convert the countdown 
        let seconds = Math.floor(countdown / 1000); // in hours
        let minutes = Math.floor(seconds / 60);     // in minutes
        let hours = Math.floor(minutes / 60);       // in seconds

        hours %= 24;   // 24 hours
        minutes %= 60; // 60 minutes
        seconds %= 60; // 60 secondes

        // return countdown
        return `${hours} : ${minutes} : ${seconds}`
    }
}

// export functions of this page
module.exports = {transformHourToDate,countdown}