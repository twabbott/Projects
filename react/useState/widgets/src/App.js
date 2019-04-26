import React from 'react';

function Greeting({name}) {
  return (name) ?
    <p>Your name is {name}.</p> :
    <p>&nbsp;</p>;
}

function App() {
  const [nameInput, setNameInput] = React.useState("");

  function onFormSubmit(event) {
    event.preventDefault();
    if (nameInput) {
      alert(`Hello, ${nameInput}!`);
    } else {
      alert('You gonna type something?');
    }
  }

  function onNameInputChanged(event) {
    setNameInput(event.target.value);
  }

  return (
    <form onSubmit={onFormSubmit}>
      <p>What is your name?</p>
      <div>
        <input        
          type="text"
          name="nameInput"
          value={nameInput}
          onChange={onNameInputChanged}
        />
        <Greeting name={nameInput} />
        <button>Submit</button>
      </div>
    </form>
  );
}

export default App;
