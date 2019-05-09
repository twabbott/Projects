/* eslint-disable radix */
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addStudentBeginAction,
  updateStudentBeginAction,
  hideFormAction,
  resetErrorMessageAction,
  appStateIsEditModeSelector,
  appStateStudentToEditSelector,
  studentsIsUpdatingSelector,
  studentsUpdateErrorSelector
} from "./store";

function mapStateToProps (state) {
  return {
    isEditMode: appStateIsEditModeSelector(state),
    student: appStateStudentToEditSelector(state),
    updating: studentsIsUpdatingSelector(state),
    error: studentsUpdateErrorSelector(state)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onCreateBtnClicked: (
      firstName, lastName, male, uvuId, race, age, isVeteran
    ) => {
      dispatch(
        addStudentBeginAction({
          firstName,
          lastName,
          male,
          uvuId,
          race,
          age,
          isVeteran
        })
      );
    },
    onSaveBtnClicked: (
      id, firstName, lastName, male, uvuId, race, age, isVeteran
    ) => {
      dispatch(
        updateStudentBeginAction({
          id,
          firstName,
          lastName,
          male,
          uvuId,
          race,
          age,
          isVeteran
        })
      );
    },
    onCancelBtnClicked: () => {
      dispatch(hideFormAction());
      dispatch(resetErrorMessageAction());
    }
  };
};

class StudentForm extends Component {
  constructor(props) {
    super(props);

    const { isEditMode, student } = this.props;
    this.state = {
      firstName: isEditMode ? student.firstName : "",
      firstNameError: "",
      lastName: isEditMode ? student.lastName : "",
      lastNameError: "",
      gender: isEditMode
        ? student.male
          ? "male"
          : "female"
        : "",
      genderError: "",
      uvuId: isEditMode ? student.uvuId : "",
      uvuIdError: "",
      race: isEditMode ? student.race : "",
      raceError: "",
      age: isEditMode ? student.age : "",
      ageError: "",
      isVeteran: isEditMode ? student.isVeteran : false
    };

    this._onInputChanged = this._onInputChanged.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  _onInputChanged(event) {
    // Get the control (React calls it the 'target').
    let target = event.target;

    // If it's a checkbox, it's value comes from the checked property,
    // otherwise take the control's value property.
    let value = target.type === "checkbox" ? target.checked : target.value;

    // Get the control's name.
    let name = target.name;

    // Set the state.
    this.setState({
      [name]: value
    });
  }

  _onFormSubmit() {
    let isValid = true;
    const {
      firstName,
      lastName,
      gender,
      uvuId,
      race,
      age,
      isVeteran
    } = this.state;
    let newState = {};

    if (firstName === "") {
      isValid = false;
      newState.firstNameError = "First name not given";
    } else {
      newState.firstNameError = "";
    }

    if (lastName === "") {
      isValid = false;
      newState.lastNameError = "Last name not given";
    } else {
      newState.lastNameError = "";
    }

    if (gender === "") {
      isValid = false;
      newState.genderError = "No gender specified";
    } else {
      newState.genderError = "";
    }

    let newUvuId = parseInt(uvuId);
    if (newUvuId === "") {
      isValid = false;
      newState.uvuIdError = "UVU ID not given";
    } else if (isNaN(newUvuId) || newUvuId < 10000000 || newUvuId > 99999999) {
      isValid = false;
      newState.uvuIdError = "UVU ID must be an 8-digit number";
    } else {
      newState.uvuIdError = "";
    }

    if (race === "") {
      isValid = false;
      newState.raceError = "No race selected";
    } else {
      newState.raceError = "";
    }

    let newAge = parseInt(age);
    if (newAge === "") {
      isValid = false;
      newState.ageError = "Age not given";
    } else if (isNaN(newAge) || newAge < 16 || newAge > 120) {
      isValid = false;
      newState.ageError = "Age must be between 16 and 120";
    } else {
      newState.ageError = "";
    }

    if (!isValid) {
      this.setState(newState);
      return;
    }

    let args = [
      firstName,
      lastName,
      gender === "male",
      newUvuId,
      race,
      newAge,
      isVeteran
    ];

    if (this.props.isEditMode) {
      this.props.onSaveBtnClicked(this.props.student.id, ...args);
    } else {
      this.props.onCreateBtnClicked(...args);
    }
  }

  render() {
    let formTitle = this.props.student ? "Edit Student" : "New Student";
    const { 
      updating, 
      error, 
      onCancelBtnClicked 
    } = this.props;
    const {
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      gender,
      genderError,
      uvuId,
      uvuIdError,
      race,
      raceError,
      age,
      ageError,
      isVeteran
    } = this.state;

    return (
      <div>
        <h1>{formTitle}</h1>
        <form>
          <div className="form-group">
            <label htmlFor="fname">First name:</label>
            <input
              type="text"
              id="fname"
              name="firstName"
              className="form-control"
              value={firstName}
              onChange={this._onInputChanged}
              disabled={updating}
            />
            <div className="text-white bg-danger">
              {firstNameError}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lname">Last name:</label>
            <input
              type="text"
              id="lname"
              name="lastName"
              className="form-control"
              value={lastName}
              onChange={this._onInputChanged}
              disabled={updating}
            />
            <div className="text-white bg-danger">
              {lastNameError}
            </div>
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <div className="radio">
              <input
                type="radio"
                id="genderMaleRadio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={this._onInputChanged}
                disabled={updating}
              />
              <label htmlFor="genderMaleRadio">Male</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="genderFemaleRadio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={this._onInputChanged}
                disabled={updating}
              />
              <label htmlFor="genderFemaleRadio">Female</label>
            </div>
            <div className="text-white bg-danger">{genderError}</div>
          </div>

          <div className="form-group">
            <label htmlFor="uvuid">UVU ID:</label>
            <input
              type="text"
              id="uvuid"
              name="uvuId"
              className="form-control"
              value={uvuId}
              onChange={this._onInputChanged}
              disabled={updating}
            />
            <div className="text-white bg-danger">{uvuIdError}</div>
          </div>

          <div className="form-group">
            <label htmlFor="race">Race</label>
            <select
              id="race"
              name="race"
              className="form-control"
              value={race}
              onChange={this._onInputChanged}
              disabled={updating}
            >
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
            <input
              type="text"
              id="age"
              name="age"
              className="form-control"
              value={age}
              onChange={this._onInputChanged}
              disabled={updating}
            />
            <div className="text-white bg-danger">{ageError}</div>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              id="isveteran"
              name="isVeteran"
              checked={isVeteran}
              onChange={this._onInputChanged}
              disabled={updating}
            />
            <label htmlFor="isveteran">Are you a US veteran?</label>
          </div>
          <button
            type="button"
            id="saveBtn"
            className="btn btn-primary"
            onClick={this._onFormSubmit}
            disabled={updating}
          >
            Save
          </button>
          <button
            type="button"
            id="cancelBtn"
            className="btn btn-warning"
            onClick={onCancelBtnClicked}
            disabled={updating}
          >
            Cancel
          </button>
          {updating && <span>Updating...</span>}
          {error && (
            <div className="text-white bg-danger">{error}</div>
          )}
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentForm);
