var pagetable = document.querySelector('#sample-timetable')

var timetable = {}

auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('timetables').get().then(snapshot => {
            timetablesetup(snapshot.docs)
            test();
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

    })

}

function test() {

    var tablehead = pagetable.children[0];

    for (var n = 1; n < 6; n++) {

        for (var i = 1; i < tablehead.childElementCount; i++) {

            let current = tablehead.children[i].children[n].children[0]

            if (current != undefined) {

                switch (n) {

                    case 0:
                        current.children[0].children[0].innerHTML = 'monday';
                        current.children[0].children[1].innerHTML = 'monday';
                        current.children[0].children[2].innerHTML = 'monday';
                    case 1:
                        current.children[0].children[0].innerHTML = 'tuesday';
                        current.children[0].children[1].innerHTML = 'tuesday';
                        current.children[0].children[2].innerHTML = 'tuesday';
                }

                current.classList.remove('invis')

                console.log(tablehead.children[i].children[n])
            }

            // console.log(timetable['monday']);
            //console.log(current);

        }
    }
}

 