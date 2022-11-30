import './App.css'
import {useEffect} from 'react'

function App() {
  useEffect(() => {
    class Car {

    }

    class Controller {

    }
    const car = document.getElementById('car')
    const speed = 10
    let previousStep = ''
    let acceleration = 1
    const coords = {
      x: 0,
      y: 0
    }

    function checkAngle(rotateDirection) {
      const directionHandler = {
        'U': () => car.style.transform = 'rotate(0deg)',
        'D': () => car.style.transform = 'rotate(180deg)',
        'L': () => car.style.transform = 'rotate(270deg)',
        'R': () => car.style.transform = 'rotate(90deg)',
      }

      directionHandler[rotateDirection]();
    }

    function checkPreviousStep(currentStep) {
      if (previousStep === currentStep) {
        acceleration += 1
      } else {
        acceleration = 1
      }
    }

    //todo: rework and union move methods
    //todo: to limit car position by window bounds
    // todo: движение машины по стрелкам с адекватным углом поворота
    // todo: вынести в классы

    function moveUp() {
      checkAngle('U')
      checkPreviousStep('U')
      car.style.setProperty('top', coords.y - speed * acceleration + 'px')
      coords.y -= speed * acceleration
      previousStep = 'U'
    }

    function moveDown() {
      checkAngle('D')
      checkPreviousStep('D')
      car.style.setProperty('top', coords.y + speed * acceleration + 'px')
      coords.y += speed * acceleration
      previousStep = 'D'
    }

    function moveLeft() {
      checkAngle('L')
      checkPreviousStep('L')
      car.style.setProperty('left', coords.x - speed * acceleration + 'px')
      coords.x -= speed * acceleration
      previousStep = 'L'
    }

    function moveRight() {
      checkAngle('R')
      checkPreviousStep('R')
      car.style.setProperty('left', coords.x + speed * acceleration + 'px')
      coords.x += speed * acceleration
      previousStep = 'R'
    }

    function checkPressAndExecute(key) {

      const objectHandler = {
        'ArrowLeft': moveLeft,
        'ArrowRight': moveRight,
        'ArrowUp': moveUp,
        'ArrowDown': moveDown,
      }

      objectHandler[key]()
    }

    document.addEventListener('keydown', (e) => {
      checkPressAndExecute(e.key)
    })

  }, [])

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
