import React, { Component } from 'react';

export default class FormDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.student? this.props.student.firstName: "",
            firstNameError: "",

            lastName:this.props.student? this.props.student.lastName:  "",
            lastNameError: "",
            
            gender: this.props.student ?
                (this.props.student.male ? "male" : "female") :
                "",
            genderError: "",
            
            uvuId: this.props.student? this.props.student.uvuId: "",
            uvuIdError: "",
            
            race: this.props.student? this.props.student.race: "",
            raceError: "",
            
            age: this.props.student? this.props.student.age: "",
            ageError: "",
            
            isVeteran: this.props.student? this.props.student.isVeteran : false
        };

        this._onInputChanged = this._onInputChanged.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
    }

    _onInputChanged(event) {
        // Get the control (React calls it the 'target').
        let target = event.target;

        // If it's a checkbox, it's value comes from the checked property, 
        // otherwise take the control's value property.
        let value = target.type === 'checkbox' ? target.checked : target.value;

        // Get the control's name.
        let name = target.name;

        // Set the state.
        this.setState({
            [name]: value
        });
    }

    _onFormSubmit() {
        let isValid = true;
        let newState = {};

        if (this.state.firstName === "") {
            isValid = false;
            newState.firstNameError = "First name not given";
        }
        else {
            newState.firstNameError = "";
        }

        if (this.state.lastName === "") {
            isValid = false;
            newState.lastNameError = "Last name not given";
        }
        else {
            newState.lastNameError = "";
        }

        if (this.state.gender === "") {
            isValid = false;
            newState.genderError = "No gender specified";
        }
        else {
            newState.genderError = "";
        }

        let uvuId = parseInt(this.state.uvuId);
        if (this.state.uvuId === "") {
            isValid = false;
            newState.uvuIdError = "UVU ID not given";
        }
        else if (isNaN(uvuId) || uvuId < 10000000 || uvuId > 99999999) {
            isValid = false;
            newState.uvuIdError = "UVU ID must be an 8-digit number";
        }
        else {
            newState.uvuIdError = "";
        }

        if (this.state.race === "") {
            isValid = false;
            newState.raceError = "No race selected";
        }
        else {
            newState.raceError = "";
        }

        let age = parseInt(this.state.age);
        if (this.state.age === "") {
            isValid = false;
            newState.ageError = "Age not given";
        }
        else if (isNaN(age) || age < 16 || age > 120) {
            isValid = false;
            newState.ageError = "Age must be between 16 and 120";
        }
        else {
            newState.ageError = "";
        }

        if (!isValid) {
            this.setState(newState);
            return;
        }

        this.props.onSubmit(
            this.props.student ? this.props.student.id : 0,
            this.state.firstName,
            this.state.lastName,
            this.state.gender === "male",
            uvuId,
            this.state.race,
            age,
            this.state.isVeteran);
    }

    render () {
        let formTitle = this.props.student? "Edit Student": "New Student";

        return (<div>
            <h1>{formTitle}</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="fname">First name:</label>
                    <input type="text" id="fname" name="firstName" className="form-control" 
                        value={this.state.firstName} onChange={this._onInputChanged} />
                    <div className="text-white bg-danger">{this.state.firstNameError}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="lname">Last name:</label>
                    <input type="text" id="lname" name="lastName" className="form-control" 
                    value={this.state.lastName} onChange={this._onInputChanged} />
                    <div className="text-white bg-danger">{this.state.lastNameError}</div>
                </div>

                <div className="form-group">
                    <label>Gender:</label>
                    <div className="radio">
                        <input type="radio" id="genderMaleRadio" name="gender" value="male" 
                            checked={this.state.gender==="male"} onChange={this._onInputChanged} />
                        <label htmlFor="genderMaleRadio">Male</label>
                    </div>
                    <div className="radio">
                        <input type="radio" id="genderFemaleRadio" name="gender" value="female" 
                            checked={this.state.gender==="female"} onChange={this._onInputChanged}/>
                        <label htmlFor="genderFemaleRadio">Female</label>
                    </div>
                    <div className="text-white bg-danger">{this.state.genderError}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="uvuid">UVU ID:</label>
                    <input type="text" id="uvuid" name="uvuId" className="form-control" 
                        value={this.state.uvuId} onChange={this._onInputChanged} />
                    <div className="text-white bg-danger">{this.state.uvuIdError}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="race">Race</label>
                    <select id="race" name="race" className="form-control" 
                        value={this.state.race} onChange={this._onInputChanged}>
                        <option value="">(not selected)</option>
                        <option value="caucasian">Caucasian</option>
                        <option value="black">Black</option>
                        <option value="hispanic">Hispanic</option>
                        <option value="asian">Asian</option>
                        <option value="other">Other</option>
                    </select>
                    <div className="text-white bg-danger">{this.state.raceError}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="text" id="age" name="age" className="form-control" 
                        value={this.state.age} onChange={this._onInputChanged} />
                    <div className="text-white bg-danger">{this.state.ageError}</div>
                </div>

                <div className="checkbox">
                    <input type="checkbox" id="isveteran" name="isVeteran"
                        checked={this.state.isVeteran} onChange={this._onInputChanged} />
                    <label htmlFor="isveteran">Are you a US veteran?</label>
                </div>
                <button type="button" id="saveBtn" className="btn btn-primary"
                    onClick={this._onFormSubmit}>Save</button>
                <button type="button" id="cancelBtn" className="btn btn-warning"
                    onClick={this.props.onCancelBtnClicked}>Cancel</button>
            </form>
        </div>);
    }
}


