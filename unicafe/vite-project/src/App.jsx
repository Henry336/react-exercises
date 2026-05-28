import { useState } from 'react'

const Header = ({header}) => {
  return (
    <>
      <h3>{header}</h3>
    </>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <>  
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text == "positive") {
    return (
      <>
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>
      </>
    )
  }

  return (
    <> 
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  const [good, neutral, bad, all, average, positive, hasFeedback] = props.stats

  if (!hasFeedback) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  
  return (
    <>
      <table>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [score, setScore] = useState(0)
  const [hasFeedback, setHasFeedback] = useState(false)

  const handleClick = text => () => {
    setHasFeedback(true)
    let newScore = score
    let newGood = good
    if (text == "good") {
      newScore = score + 1
      newGood = good + 1
      setGood(newGood)
      setScore(newScore)
    } else if (text == "neutral") {
      setNeutral(neutral + 1)
    } else {
      newScore = score - 1
      setBad(bad + 1)
      setScore(newScore)
    }
    const newAll = all + 1
    setAll(newAll)
    setAverage(newScore / newAll)
    setPositive((newGood / newAll) * 100)
  }

  const stats = [
    good, neutral, bad, all, average, positive, hasFeedback
  ]

  return (
    <div>
      <Header header="Give Feedback:"/>
      <Button onClick={handleClick("good")} text="good"/>
      <Button onClick={handleClick("neutral")} text="neutral"/>
      <Button onClick={handleClick("bad")} text="bad"/>
      <Header header="Statistics:"/>
      <Statistics stats={stats}/>
    </div>
  )
}

export default App