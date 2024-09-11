function toggleCalendarForm (){
    let category = document.getElementById('category')
    let options = document.getElementById('calendarOptions')
    console.log(category)

    if (category.value === 'calendar tasks' ) {
        options.style.display = "block"
    } else {
        options.style.display = "none"
    }



}