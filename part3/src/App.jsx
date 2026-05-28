import { useState } from 'react'

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const History = ({ allClicks }) => {
  let text = ""
  if (allClicks.length == 0) {
    text = "Start clicking to see the sequence!"
  } else {
    text = "Click sequence: " + allClicks.join(" ")
  }

  return (
    <>
      <p>{text}</p>
    </>
  )
}

const Display = ({ counter, text }) => {
  return (
    <>
      <p>{text}-click current count: {counter}</p>
    </>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setLeft(left + 1)
    setAll(allClicks.concat('L'))
    setTotal(total + 1)
  }

  const handleRightClick = () => {
    setRight(right + 1)
    setAll(allClicks.concat('R'))
    setTotal(total + 1)
  }

  const handleResetClick = () => {
    setLeft(0)
    setRight(0)
    setAll([])
    setTotal(0)
  }

  const handleClick = mode => {
    let resultingFunc = null
    if (mode == "left") {
      resultingFunc = handleLeftClick
    } else if (mode == "right") {
      resultingFunc = handleRightClick
    } else {
      resultingFunc = handleResetClick
    }
    return resultingFunc
  }

  return (
    <div>
      <Display counter={left} text="Left"/>
      <Display counter={right} text="Right"/>
      <Button onClick={handleClick("left")} text="Left"/>
      <Button onClick={handleClick("right")} text="Right"/>
      <Button onClick={handleClick("reset")} text="Reset"/>
      <History allClicks={allClicks}/>
      <p>Total: {total}</p>
    </div>
  )
}

export default App