import { useState } from 'react'

const Header = () =>
  <h1>give feedback</h1>

const Button = ({handleClick, text}) =>
  <button onClick={handleClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const avg = (good - bad) / total;
  const HUNDRED = 100;
  const positive = good / total * HUNDRED;
  if (total === 0)
    return (
      <div>No feedback given</div>
    )

  return (
    <table>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <tr>all<td>{total}</td></tr>
      <tr>average<td>{avg}</td></tr>
      <tr>positive<td>{positive} %</td></tr>
    </table>
  )
}

const StatisticsHeader = () =>
  <h1>statistics</h1>

const StatisticLine = ({text, value}) => {
  return (
    <tr>{text}
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)
  }

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const handleBadClick = () => {
    const updateBad = bad + 1
    setBad(updateBad)
  }

  return (
    <div>
      <Header />
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
