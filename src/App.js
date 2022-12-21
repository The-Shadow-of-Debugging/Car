import './App.css'
import {useEffect} from 'react'

function App() {
  useEffect(() => {

    const carCanvas = document.getElementById('car');
    const currentPosition = {
      x: 500,
      y: -200,
    }

    class Car {
      constructor() {
        this.x = currentPosition.x;
        this.y = currentPosition.y;
        this.xVelocity = 5;
        this.yVelocity = 5;
        this.currentDirection = 0;
      }

      directTop() {
        const carDirection = Math.abs(this.currentDirection) % 360;

        const directions = {
          90: () => this.currentDirection ? this.x += this.xVelocity : this.x -= this.xVelocity,
          180: () => this.y -= this.yVelocity,
          270: () => this.currentDirection ? this.x -= this.xVelocity : this.x += this.xVelocity,
          0: () => this.y += this.yVelocity,
        }

        directions[carDirection]()
      }

      directBottom() {
        const carDirection = Math.abs(this.currentDirection) % 360;
        const directions = {
          90: () => this.currentDirection ? this.x -= this.xVelocity : this.x += this.xVelocity,
          180: () => this.y += this.yVelocity,
          270: () => this.currentDirection ? this.x += this.xVelocity : this.x -= this.xVelocity,
          0: () => this.y -= this.yVelocity,
        }

        directions[carDirection]()
      }

      move(direction) {
        if(!direction) return;

        const directionHandler = {
          'Up': () => {this.directTop()},
          'Down': () => {this.directBottom()},
          'Left': () => this.changeDirection(direction),
          'Right': () => this.changeDirection(direction),
        }

        directionHandler[direction]();
      }

      changeDirection(direction) {
        const directionHandler = {
          'Left': () => {this.currentDirection -=90; carCanvas.style.transform = 'rotate(' + this.currentDirection + 'deg)'; },
          'Right': () => {this.currentDirection +=90; carCanvas.style.transform = 'rotate(' + this.currentDirection +'deg)'; },
        }
        directionHandler[direction]()
      }

      draw() {
        carCanvas.style.setProperty('bottom', this.y + 'px');
        carCanvas.style.setProperty('left', this.x + 'px');
      }
    }

    const carObject = new Car();
    let direction = '';

    document.addEventListener('keydown', ({code}) => {
      const directionHandler = {
        ArrowUp: 'Up',
        ArrowDown: 'Down',
        ArrowLeft: 'Left',
        ArrowRight: 'Right',
      }

      direction = directionHandler[code];
    })

    document.addEventListener('keyup', ({code}) => {
      if(direction !== 'Up' || direction !== 'Down') {
        direction = '';
      }
    })

    let rotationCount = 0;

    const loop = () => {

      if (!rotationCount) {
        carObject.move(direction);
        carObject.draw();
        rotationCount++;
      }

      if(direction === 'Up' || direction === 'Down') {
        carObject.move(direction);
        carObject.draw();
        rotationCount = 0;
      }

      requestAnimationFrame(loop);
    }

    loop();

    //todo: rework and union move methods
    //todo: to limit car position by window bounds

  }, []);

  return (
    <div className="car" id="car">
      <div className="car__body">
        <div className="car__shield"></div>
      </div>
      <div className="car__wheel car__wheel_front car_wheel_left"></div>
      <div className="car__wheel car__wheel_front car_wheel_right"></div>
      <div className="car__wheel car__wheel_back car_wheel_left"></div>
      <div className="car__wheel car__wheel_back car_wheel_right"></div>
    </div>
  )
}

export default App
