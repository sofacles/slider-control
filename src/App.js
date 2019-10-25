import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  let [x, setX] = useState(10);

  useEffect(() => {
    let app = document.getElementsByClassName("App")[0];
    console.log(`app is ${app}`);
    app.addEventListener("mousedown", (e) => {
      console.log("inside mousedown");
      setX(x => x + 10);
    });
  }, []);

  
  
  let containerStyle = {
    position: "absolute",
    width: "300px",
    height: "30px",
    backgroundColor: "#f7a"
  };

  let moveableStyle = {
    position: "absolute",
    top: "10px",
    left: `${x}px`,
    width: "10px",
    height: "10px",
    backgroundColor: "#8C1"
  };


  return (
    <div className="App">
      <div style={containerStyle}>
        <div id="moveable" style={moveableStyle}></div>
      </div>
    </div>
  );
}

export default App;
