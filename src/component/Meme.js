/* This is a component about the meme generator */
import React, { useState } from "react";

function Meme() {
  function hours() {
    const date = new Date();
    const hours = date.getHours();
    const [isImportant, func] = useState;

    if (hours >= 4 && hours < 11) {
      console.log("Good morning");
    } else if (hours >= 12 && hours < 17) {
      console.log("good afternoon");
    } else if (hours >= 5 && hours < 8) {
      console.log("Good evening");
    } else {
      console.log("good night");
    }
  }
  return (
    <div className="meme-container">
      <div className="meme-form">
        <input type="text" placeholder="Insert text 1" />
        <input type="text" placeholder="Insert text 1" />
        <button onClick={hours} className="meme-button">
          Get a new meme
        </button>
      </div>
    </div>
  );
}

export default Meme;
