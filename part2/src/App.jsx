import {useState} from 'react'

const Display = ({counter}) => {
  return (
    <>
      <p>Current count: {counter}</p>
    </>
  )
}

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const handleAdd = () => {
    console.log("clicked Add")
    setCounter(counter + 1)
  }
  const handleSub = () => {
    console.log("clicked Subtract")
    if (counter == 0) {
      return
    }
    setCounter(counter - 1)
  }

  const handleReset = () => {
    setCounter(0)
  }

  const handleMultiply = () => {
    if (counter == 0) {
      return
    }

    setCounter(counter * 2)
  }

  return (
    <>
      <Display counter={counter}/>
      <Button onClick={handleAdd} text="Add" />
      <Button onClick={handleSub} text="Subtract" />
      <Button onClick={handleMultiply} text="Multiply by 2" />
      <Button onClick={handleReset} text="Reset" />
    </>
  )
}

export default App