////////////////////////////////////////////////////////////////////////////////
///   P a g e  E v e n t   H a n d l e r s
////////////////////////////////////////////////////////////////////////////////

var isLoading = false;

/************************************************/
function onPageLoad() {
    // Wire up all button handlers
    $("#createBtn").click(onCreateBtnClicked);
    $('#cancelBtn').click(onCancelBtnClicked);
    $('#newBtn').click(onNewBtnClicked);

    setBusy(true);
    modelGetAllStudents().then(function(studentList) {
        for (var i = 0; i < studentList.length; i++) {
            addTableItem(studentList[i]);
        }
    })
    .catch(function(error) {
        console.log(JSON.stringify(error, null, "\t"));
    })
    .finally(function() {
        setBusy(false);
    });

    clearInputForm();
}

/************************************************/
function onCreateBtnClicked() {
    // Validate the data in all the controls.
    if (!validateControls())
        return;

    setBusy(true);

    // Get the data from the form controls, and
    // create a new Student object.
    var form = document.forms["editForm"];
    modelCreateStudent(
        form.firstNameEdit.value,
        form.lastNameEdit.value,
        form.genderMaleRadio.checked,
        parseInt(form.uvuIdEdit.value),
        form.raceSelect.value,
        parseInt(form.ageEdit.value))
    .then(function(newStudent) {
        // Add the new student to the view
        addTableItem(newStudent);

        // Clear the input form and all errors.
        clearInputForm()
    })
    .catch(function(erro) {

    })
    .finally(function() {
        // Open the modal
        $("#studentModal").modal('toggle');
        setBusy(false);
    });
}

/************************************************/
function onNewBtnClicked() {
    // Set the title on the form.
    $("#formTitle").text("Create New Student");

    // Hide the form, show the contact list.
    $("#createBtn").css("display", "inline");
    $("#saveBtn").css("display", "none");
}

/************************************************/
function onCancelBtnClicked() {
    clearInputForm();
}

/************************************************/
function onEditBtnClicked(id) {
    // Set the title on the form.
    $("#formTitle").text("Edit Student");
    
        // Fetch the Student record from the database
    var student = modelGetStudent(id);
    if (student == null) {
        alert("Unable to find student ID " + id);
    }

    // Hide the form, show the contact list.
    $("#createBtn").css("display", "none");
    $("#saveBtn").css("display", "inline");

    // Populate the edit form with data from the Student object.
    var form = document.forms["editForm"];
    form.firstNameEdit.value = student.firstName;
    form.lastNameEdit.value = student.lastName;

    if (student.male)
        form.genderMaleRadio.checked = true;
    else
        form.genderFemaleRadio.checked = true;

    form.uvuIdEdit.value = student.uvuId;

    // Make sure the correct race option is selected.
    var select = form.raceSelect;
    select.options[0].selected = true; 
    for (x in select.options) {
        if (select.options[x].value == student.race) {
            select.options[x].selected = true;
        }
    }

    form.ageEdit.value = student.age;

    // Hide the Create button
    $("#createBtn").css("display", "none");
    
    // Un-hide the Save button and set its onclick handler
    $("#saveBtn")
        .css("display", "inline")
        .off("click")
        .click(function () { onSaveBtnClicked(student.id) });

    // Open the modal
    $("#studentModal").modal('toggle');
}

/************************************************/
function onSaveBtnClicked(id) {
    // Validate all the controls
    if (!validateControls())
        return;

    setBusy(true);

    // Copy the data from the form controls to the 
    // record in the model.
    var form = document.forms["editForm"];
    modelUpdateStudent(
        id,
        form.firstNameEdit.value,
        form.lastNameEdit.value,
        form.genderMaleRadio.checked,
        parseInt(form.uvuIdEdit.value),
        form.raceSelect.value,
        parseInt(form.ageEdit.value))
    .then(function(student) {
        // Update the row in the table.
        var tdList = $("#row"+id).children();
        tdList.eq(0).text(student.uvuId);
        tdList.eq(1).text(student.firstName + " " + student.lastName);
        tdList.eq(2).text(student.male ? "Male" : "Female");
    })
    .catch(function(error) {
        alert(error);
    })
    .finally(function() {
        setBusy(false);
        
        // Reset the input form.
        clearInputForm();

        // Close the modal
        $("#studentModal").modal('toggle');
    });
}

/************************************************/
function onDeleteBtnClicked(id) {
    // Fetch the student record from the model
    var student = modelGetStudent(id);
    if (student == null) {
        alert("Unable to find student ID " + id)
    }

    if (!confirm("Are you sure you want to delete " +
        student.firstName + " " + student.lastName + "?"))
        return;

    setBusy(true);
    modelDeleteStudent(id)
    .then(function() {
        $("#row"+id).remove();
        setBusy(false);
    })
    .catch(function(error) {
        alert(error);
    });
}


////////////////////////////////////////////////////////////////////////////////
///   B u s i n e s s   L o g i c
////////////////////////////////////////////////////////////////////////////////

/************************************************/
function validateControls() {
    var form = document.forms["editForm"];
    var validated = true;

    // First name textbox
    if (form.firstNameEdit.value == "") {
        $("#firstNameError").text("First name not given.");
        validated = false;
    }
    else
        $("#firstNameError").text("");

    // Last name textbox
    if (form.lastNameEdit.value == "") {
        $("#lastNameError").text("Last name not given.");
        validated = false;
    }
    else
        $("#lastNameError").text("");

    // Gender radio buttons
    if (form.genderMaleRadio.checked == false && form.genderFemaleRadio.checked == false) {
        $("#genderError").text("Gender not given.");
        validated = false;
    }
    else
        $("#genderError").text("");

    // UVU id textbox
    if (form.uvuIdEdit.value == "") {
        $("#uvuIdError").text("UVU ID not given.");
        validated = false;
    }
    else if (isNaN(parseInt(form.uvuIdEdit.value))) {
        $("#uvuIdError").text("UVU ID must be a number.");
        validated = false;
    }
    else
        $("#uvuIdError").text("");

    // Race dropdown
    if (form.raceSelect.selectedIndex == -1) {
        $("#raceError").text("Race not given.");
        validated = false;
    }
    else
        $("#raceError").text("");

    // Age textbox
    if (form.ageEdit.value == "") {
        $("#ageError").text("Age not given.");
        validated = false;
    }
    else if (isNaN(parseInt(form.ageEdit.value))) {
        $("#ageError").text("Age must be a number.");
        validated = false;
    }
    else if (parseInt(form.ageEdit.value) < 0 || parseInt(form.ageEdit.value) > 110) {
        $("#ageError").text("Age must be positive and less than 110.");
        validated = false;
    }
    else
        $("#ageError").text("");

    // Return the final result
    return validated;
}

/************************************************/
function addTableItem(student) {
    var table = $("#studentTable").get(0);

    // Compose a new row, and set its id attribute.  This helps us
    // if the user wants to change the student's info later.
    var row = table.insertRow(table.rows.length);
    row.id = 'row' + student.id;

    var cell = row.insertCell(0);
    cell.innerHTML = student.uvuId;

    cell = row.insertCell(1);
    cell.innerHTML = student.firstName + " " + student.lastName;

    cell = row.insertCell(2);
    cell.innerHTML = (student.male ? "Male" : "Female");

    cell = row.insertCell(3);
    cell.innerHTML += "<button type='button' id='btnEdit" + student.id + "' class='btn btn-info btn-sm'><span class='glyphicon glyphicon-edit'/></button>";
    cell.innerHTML += "&nbsp;<button type='button' id='btnDelete" + student.id + "' class='btn btn-danger btn-sm'><span class='glyphicon glyphicon-trash'/></button>";

    // Wire up handlers for the new buttons
    $('#btnEdit' + student.id).click(function () { onEditBtnClicked(student.id) });
    $('#btnDelete' + student.id).click(function () { onDeleteBtnClicked(student.id) });
}

/************************************************/
function clearInputForm() {
    var form = document.forms["editForm"];

    form.firstNameEdit.value = "";
    $("#firstNameError").text("");

    form.lastNameEdit.value = "";
    $("#lastNameError").text("");

    form.genderMaleRadio.checked = false;
    form.genderFemaleRadio.checked = false;
    $("#genderError").text("");

    form.uvuIdEdit.value = "";
    $("#uvuIdError").text("");

    form.raceSelect.selectedIndex = -1;
    $("#raceError").text("");

    form.ageEdit.value = "";
    $("#ageError").text("");
}

function setBusy(isBusy) {
    if (isBusy) {
        $("#loading").css("display", "inline");
        $("button").attr({disabled: true});
    } else {
        $("#loading").css("display", "none");
        $("button").attr({disabled: false});
    }
}
