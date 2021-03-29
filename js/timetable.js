var timetable = document.querySelector('#sample-timetable')

var timetable = {}

auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('timetables').get().then(snapshot => {
            timetablesetup(snapshot.docs)
        })
    } else {
        timetablesetup([ ])
    }
});

const timetablesetup = (data) => {

    let html = '';
    data.forEach(e => {
        
        const item = e.data();

        if (item['class'] == "5a") {
            timetable = item
        }

        console.log(timetable);
    })

}