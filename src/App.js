import React, { useLayoutEffect, useRef } from "react";
import "./App.css";

function App() {
  let moveableRef = useRef(null);

  useLayoutEffect(() => {
    const moveable = moveableRef.current;

    // I need to correct the mouse.x value so that the x is relative to the container
    let containerLeft = null;
    const mouseMoveHandler = e => {
      let newX = e.clientX - containerLeft - 10;
      console.log(`setting left to ${newX}`);
      console.log(`In mouseMove it's ${performance.now()}`);
      moveable.style.left = `${newX}px`;
    };

    const mouseDownHandler = e => {
      if (containerLeft === null) {
        const container = e.currentTarget.parentElement;
        container && (containerLeft = container.getBoundingClientRect().x);
      }
      console.log(`In mouseDown it's ${performance.now()}`);
      moveable.addEventListener("mousemove", mouseMoveHandler);
    };

    const mouseUpHandler = e => {
      moveable.removeEventListener("mousemove", mouseMoveHandler);
    };

    moveable.addEventListener("mousedown", mouseDownHandler);
    moveable.addEventListener("mouseup", mouseUpHandler);

    return () => {
      moveable.removeEventListener("mousedown", mouseDownHandler);
      moveable.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  let containerStyle = {
    position: "absolute",
    width: "300px",
    height: "30px",
    backgroundColor: "#f7a"
  };

  let moveableStyle = {
    boxSizing: "border-box",
    position: "absolute",
    top: "3px",
    left: "0px",
    padding: "5px",
    width: "24px",
    height: "24px",
    backgroundColor: "#8C1",
    backgroundClip: "content-box"
  };

  return (
    <div className="App">
      <div style={containerStyle}>
        <div id="moveable" ref={moveableRef} style={moveableStyle} />
      </div>
    </div>
  );
}

export default App;
