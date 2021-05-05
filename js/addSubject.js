addSubjectForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const colorInput = addSubjectForm['colorInput'].value;
    const nameInput = addSubjectForm['nameInput'].value;
    const roomInput = addSubjectForm['roomInput'].value;
    const teacherInput = addSubjectForm['teacherInput'].value;

    db.collection("subjects").doc(`${nameInput + teacherInput}`).set({
        name: nameInput,
        color: colorInput,
        room: roomInput,
        teacher: teacherInput
    }).then(() => {
        console.log("Document Added!")
    })

});