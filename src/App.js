import React, {useState} from "react";
import { HorizontalSlider } from "./Slider";
import "./App.css";

function App() {
  const [valFromSlider, setValFromSlider] = useState(0);
  const updateValue = (newVal) => {
    setValFromSlider(newVal);
  };

  let outputStyle = {
    fontSize: "24px",
    padding: "12px"
  };

  return (
    <div className="App">
      <HorizontalSlider onValueChanged={updateValue} orientation="horizontal"/>
      <div style={outputStyle}>{valFromSlider}</div>
    </div>
  );
}

export default App;
