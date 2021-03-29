var pagetable = document.querySelector('#sample-timetable')

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

var tablehead = pagetable.children[0];

console.log(tablehead.childElementCount);

for (var n = 1; n < 6; n++) {
    for (var i = 1; i < tablehead.childElementCount; i++) {

        console.log(tablehead.children[i].children[n]);
    
    }
}
 