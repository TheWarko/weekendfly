import moment from 'moment';

// The function return array that contains all friday in range time search
export const getDayOfWeekArray = (searchFrom,searchTo,departureDay) => {

    if(searchFrom && searchTo && departureDay){
        const dayOfWeek = parseInt(departureDay); //friday is day 5 of week
        let dayOfWeekArray = [];
        let day = new Date(searchFrom);
        const finalDate = new Date(searchTo);

        // Get the first Friday in the month
        while (day.getDay() !== dayOfWeek) {
            day.setDate(day.getDate() + 1);
        }
        // Get all the other Fridays in range time search
        while (day <= finalDate) {
            let pushDate = moment(day.getTime());
            dayOfWeekArray.push( pushDate.format('DD/MM/YYYY') );
            day.setDate(day.getDate() + 7);
        }

        return dayOfWeekArray;
    }
    else{
        console.log('getDayOfWeekArray error');
        return false;
    }

}
