import React, { useState } from 'react';

export default function StudentForm({
    student,
    loading,
    error,
    onSubmit,
    onCancelBtnClicked
}) {
    const [firstName, setFirstName] = useState(student? student.firstName: "");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState(student? student.lastName: "");
    const [lastNameError, setLastNameError] = useState("");
    const [gender, setGender] = useState(student ? (student.male ? "male" : "female") : "");
    const [genderError, setGenderError] = useState("");
    const [uvuId, setUvuId] = useState(student? student.uvuId: "");
    const [uvuIdError, setUvuIdError] = useState("");
    const [race, setRace] = useState(student? student.race: "");
    const [raceError, setRaceError] = useState("");
    const [age, setAge] = useState(student? student.age: "");
    const [ageError, setAgeError] = useState("");
    const [isVeteran, setIsVeteran] = useState(student? student.isVeteran: false);

    function onFormSubmit() {
        let isValid = true;

        if (firstName === "") {
            isValid = false;
            setFirstNameError("First name not given");
        }
        else {
            setFirstNameError("");
        }

        if (lastName === "") {
            isValid = false;
            setLastNameError("Last name not given");
        }
        else {
            setLastNameError("");
        }

        if (gender === "") {
            isValid = false;
            setGenderError("No gender specified");
        }
        else {
            setGenderError("");
        }

        if (uvuId === "") {
            isValid = false;
            setUvuIdError("UVU ID not given");
        }
        else {
            const num = parseInt(uvuId);
            if (isNaN(num) || num < 10000000 || num > 99999999) {
                isValid = false;
                setUvuIdError("UVU ID must be an 8-digit number");
            }
            else {
                setUvuIdError("");
            }
        } 

        if (race === "") {
            isValid = false;
            setRaceError("No race selected");
        }
        else {
            setRaceError("");
        }

        if (age === "") {
            isValid = false;
            setAgeError("Age not given");
        }
        else {
            let num = parseInt(age);
            if (isNaN(num) || num < 16 || num > 120) {
                isValid = false;
                setAgeError("Age must be between 16 and 120");
            }
            else {
                setAgeError("");
            }
        }

        if (!isValid) {
            return;
        }

        onSubmit(
            student ? student.id : 0,
            firstName,
            lastName,
            gender === "male",
            uvuId,
            race,
            age,
            isVeteran);
    }

    return (<div>
        <h1>{student? "Edit Student": "New Student"}</h1>
        <form>
            <div className="form-group">
                <label htmlFor="fname">First name:</label>
                <input type="text" id="fname" name="firstName" className="form-control" 
                    value={firstName} onChange={event => setFirstName(event.target.value)} />
                <div className="text-white bg-danger">{firstNameError}</div>
            </div>

            <div className="form-group">
                <label htmlFor="lname">Last name:</label>
                <input type="text" id="lname" name="lastName" className="form-control" 
                value={lastName} onChange={event => setLastName(event.target.value)} />
                <div className="text-white bg-danger">{lastNameError}</div>
            </div>

            <div className="form-group">
                <label>Gender:</label>
                <div className="radio">
                    <input type="radio" id="genderMaleRadio" name="gender" value="male" 
                        checked={gender==="male"} onChange={event => setGender(event.target.value)} />
                    <label htmlFor="genderMaleRadio">Male</label>
                </div>
                <div className="radio">
                    <input type="radio" id="genderFemaleRadio" name="gender" value="female" 
                        checked={gender==="female"} onChange={event => setGender(event.target.value)}/>
                    <label htmlFor="genderFemaleRadio">Female</label>
                </div>
                <div className="text-white bg-danger">{genderError}</div>
            </div>

            <div className="form-group">
                <label htmlFor="uvuid">UVU ID:</label>
                <input type="text" id="uvuid" name="uvuId" className="form-control" 
                    value={uvuId} onChange={event => setUvuId(event.target.value)} />
                <div className="text-white bg-danger">{uvuIdError}</div>
            </div>

            <div className="form-group">
                <label htmlFor="race">Race</label>
                <select id="race" name="race" className="form-control" 
                    value={race} onChange={event => setRace(event.target.value)}>
                    <option value="">(not selected)</option>
                    <option value="caucasian">Caucasian</option>
                    <option value="black">Black</option>
                    <option value="hispanic">Hispanic</option>
                    <option value="asian">Asian</option>
                    <option value="other">Other</option>
                </select>
                <div className="text-white bg-danger">{raceError}</div>
            </div>

            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="text" id="age" name="age" className="form-control" 
                    value={age} onChange={event => setAge(event.target.value)} />
                <div className="text-white bg-danger">{ageError}</div>
            </div>

            <div className="checkbox">
                <input type="checkbox" id="isveteran" name="isVeteran"
                    checked={isVeteran} onChange={event => setIsVeteran(event.target.checked)} />
                <label htmlFor="isveteran">Are you a US veteran?</label>
            </div>
            <button type="button" id="saveBtn" className="btn btn-primary"
                disabled={loading} onClick={onFormSubmit}>Save</button>
            <button type="button" id="cancelBtn" className="btn btn-warning"
                disabled={loading} onClick={onCancelBtnClicked}>Cancel</button>
            { loading && <span>Updating...</span> }
            { error && <span>{error}</span> }
        </form>
    </div>);
}


