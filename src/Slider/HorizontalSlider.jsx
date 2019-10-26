import React, { useState, useEffect, useRef } from "react";

const HorizontalSlider = ({
    onValueChanged = () => {},
    width = "300",
    height = "30px",
    minVal = 0,
    maxVal = 100
  }) => {
    let [x, setX] = useState({pixelX : 0});
    let moveableRef = useRef(null);
    // The box that slides around has a background-clip on it, so it is bigger than it looks in the UI.
    // I'll change it from a box soon, probably to a "needle" or something
    const virtualSliderWidth = 24;
  
    useEffect(() => {
      const moveable = moveableRef.current;
  
      // I need to correct the mouse.x value so that the x is relative to the container
      // containerLeft is the x value of the left edge of the container, measured from the edge of the window
      let containerLeft = null;
      const mouseMoveHandler = e => {
        let newLeft = e.clientX - containerLeft - 10;
        if(newLeft + (virtualSliderWidth) < width && newLeft > 0) {
            setX({pixelX: newLeft});
            reportActualValue(newLeft);
            console.log(`mousemove at ${e.clientX - containerLeft}`);
        } else {
            moveable.removeEventListener("mousemove", mouseMoveHandler);
        }
      };

      const reportActualValue = (px) => {
          const conversionFactor = maxVal / width;
          const converted = Math.round(px * conversionFactor);
          onValueChanged(converted);
      }; 

      const mouseDownHandler = e => {
        if (containerLeft === null) {
          const container = e.currentTarget.parentElement;
          container && (containerLeft = container.getBoundingClientRect().x);
        }
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
      position: "relative",
      width: width + "px",
      height: height,
      backgroundColor: "#f7a"
    };
  
    let moveableStyle = {
      boxSizing: "border-box",
      position: "absolute",
      top: "3px",
      left: `${x.pixelX}px`,
      padding: "5px",
      width: "24px",
      height: "24px",
      backgroundColor: "#8C1",
      backgroundClip: "content-box"
    };
  
    return (
      <div style={containerStyle}>
        <div id="moveable" ref={moveableRef} style={moveableStyle} />
      </div>
    );
  };
  
  export default HorizontalSlider;

  