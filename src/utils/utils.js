import moment from 'moment';

// The function return array that contains all friday in range time search
export const getDayOfWeekArray = (searchFrom,searchTo) => {

    const dayOfWeek = 5; //friday is day 5 of week
    let dayOfWeekArray = [];
    let day = moment(searchFrom);
    const finalDate = searchTo;
    // console.log(day);
    // console.log(day.day());

    // Plugin => https://github.com/kodie/moment-weekdaysin

    // // Get the first Friday in the month
    // while (day.day() !== dayOfWeek) {
    //     day.set(day.get() + 1);
    // }
    // // Get all the other Fridays in the month
    // while (day <= finalDate) {
    //     let pushDate = moment();
    //     dayOfWeekArray.push( pushDate.format('DD/MM/YYYY') );
    //     day.set(day.get() + 7);
    // }
    // //console.log(dayOfWeekArray);
    // return dayOfWeekArray[0];


    dayOfWeekArray = ['10/01/2020','17/01/2020','24/01/2020','31/01/2020'];
    return dayOfWeekArray;

}







/*

    TO DO: al momento questa funzione passa un array statico

*/