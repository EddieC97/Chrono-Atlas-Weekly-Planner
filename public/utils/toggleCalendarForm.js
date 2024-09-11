function toggleCalendarForm (){
    let category = document.getElementById('category')
    let options = document.getElementById('calendarOptions')
    

    if (category.value === 'calendar tasks' ) {
        options.style.display = "block";
    } else {
        options.style.display = "none";
    }



}