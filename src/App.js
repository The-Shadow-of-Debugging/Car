import './App.css';
import {useEffect} from 'react'

function App() {
  useEffect(() => {
  const car = document.getElementById("car");
  const speed = 10;
  const coords = {
    x: 0,
    y: 0,
  }

  function checkAngle(rotateDirection) {
    switch(rotateDirection) {
      case 'U':
        rotateUp();
        break;
      case 'D':
        rotateDown();
        break;
      case 'L':
        rotateLeft();
        break;
      case 'R':
        rotateRight();
        break;
    }
  }

  function rotateUp() {
    car.style.transform = `rotate(0deg)`;
  }

  function rotateDown() {
    car.style.transform = `rotate(180deg)`;
  }

  function rotateLeft() {
    car.style.transform = `rotate(270deg)`;
  }

  function rotateRight() {
    car.style.transform = `rotate(90deg)`;
  }

  function moveUp() {
    checkAngle('U');
    car.style.setProperty('top', coords.y - speed + 'px');
    coords.y -= speed;
  }

  function moveDown() {
    checkAngle('D');
    car.style.setProperty('top', coords.y + speed + 'px');
    coords.y += speed;
  }

  function moveLeft() {
    checkAngle('L');
    car.style.setProperty('left', coords.x - speed + 'px');
    coords.x -= speed;
  }

  function moveRight() {
    checkAngle('R');
    car.style.setProperty('left', coords.x + speed + 'px');
    coords.x += speed;
  }

  function checkPressAndExecute(key) {

    if(key === "ArrowLeft") {
      moveLeft();
    }

    if(key === "ArrowRight") {
      moveRight();
    }

    if(key === "ArrowUp") {
      moveUp();
    }

    if(key === "ArrowDown") {
      moveDown();
    }
  }

  document.addEventListener("keydown", (e) => {
    checkPressAndExecute(e.key)
  })

  }, [])

  return (
    <div className="car" id="car">
      <div className="car__body">
        <div className="car__shield"></div>
      </div>
      <div className="car__front-left-wheel"></div>
      <div className="car__front-right-wheel"></div>
      <div className="car__back-left-wheel"></div>
      <div className="car__back-right-wheel"></div>
    </div>
  );
}

export default App;
