import React from 'react';

function App() {
  const [visible, setVisible] = React.useState(false);

  function onClick() {
    setVisible(!visible);
  }
  
  return (
    <div>
      <div>What's the difference between a hippo and a Zippo?</div>
      <div>{ visible ? 
        `One's really heavy, and the other's a little lighter.` :
        <span>&nbsp;</span> }
      </div>
      <div>
        <button type="button" onClick={onClick}>
          { visible ? "Hide Answer" : "Show Answer" }
        </button>
      </div>
    </div>
  );
}

export default App;
