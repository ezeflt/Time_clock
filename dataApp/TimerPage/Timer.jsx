/**
 * Description :
 * 
 * 
 * @params date on which I will count down
 * @return countdown in string format
 */
const countdown = (data)=>{

    // data becomes format Date 
    const targetDate = new Date(data);

    // current date
    const currentDate = new Date();

    // Calculate the difference in millisecondes
    const difference = targetDate.getTime() - currentDate.getTime();

    // Check value difference > 0
    if (difference > 0) {

        // Convert the différence on days, hours, minutes et seconds
        let milliseconds = Math.floor(difference / 10000);
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        

        //return countdown
        return `${hours} : ${minutes} : ${seconds} ${milliseconds}`
    }
}

  module.exports = {countdown}