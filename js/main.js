var pagetable = document.querySelector('#sample-timetable')
let timetable = [];
let subjects = []
const days = ['','monday','tuesday', 'wednesday', 'thursday', 'friday'];

auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('subjects').get().then(snapshot => {
            subjectlistsetup(snapshot.docs)
            console.log(subjects)
            db.collection('timetables').get().then(snapshot => {
                timetablesetup(snapshot.docs)
                replaceSubjectsInTable();
                hideSpinner();
            })
        })
    } else {
        timetablesetup([ ])
        subjectlistsetup([ ])
    }
});

const timetablesetup = (data) => {

    let html = '';
    data.forEach(e => {
        
        const item = e.data();

        if (item['class'] == "5a") {
            timetable.push(item)
        }
    })
}

const subjectlistsetup = (data) => {

    let html = '';
    data.forEach(e => {
        
        const item = e.data();
        subjects.push(item)

    })

}

function filterSubject(objects, currentString, inserter) {
    for(var i=0; i<objects.length; i++) {
        for(key in objects[i]) {
            if(objects[i][key] == currentString) {
                console.log(objects[i]);
                inserter.push(objects[i]);
                console.log(inserter);
            }
        }
    }
}

function replaceSubjectsInTable() {

    console.log(timetable)

    var tablehead = pagetable.children[0];

    for (var column = 1; column < 6; column++) {
        for (var row = 1; row < tablehead.childElementCount; row++) {
            let current = tablehead.children[row].children[column];
            let currentDay = days[column];
            let currentSubject = timetable[0][currentDay][row];
            let insertSubject = [];

            if (currentSubject != 0) {
                filterSubject(subjects, currentSubject, insertSubject)
                
                var classBlueprint = 'card timetable-card ' + insertSubject[0]['color'] + ' filled';

                var div = document.createElement('div');
                div.setAttribute('class', classBlueprint);
                div.innerHTML = `<div class="card-body">
                <h5 class="card-title">` + insertSubject[0]['name'] + `</h5>
                <h6 class="card-subtitle mb-1">` + insertSubject[0]['teacher'] + `</h6>
                <h6 class="card-subtitle mt-1">` + insertSubject[0]['room'] + `</h6>
                </div>`;
                
                current.appendChild(div);
            }
        }
    }
}

function hideSpinner() {
    let spinner = document.querySelector('.blackbox');
    spinner.style.display = 'none';
}