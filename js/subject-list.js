const list = document.querySelector('#list');

const setuplist = (data) => {

    let html = '';
    data.forEach(element => {
        const item = element.data();
        const li = `
            <li>
                ${item.name}
            </li>
        `;
        html += li;
    });

    list.innerHTML = html;

}

auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('subjects').get().then(snapshot => {
            setuplist(snapshot.docs)
        })
    } else {
        setuplist([ ])
    }
});
