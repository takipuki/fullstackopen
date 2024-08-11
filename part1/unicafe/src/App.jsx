import { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={() => setGood(good + 1)} text='good' />
      <Button handler={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handler={() => setBad(bad + 1)} text='bad' />

      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

function Button({handler, text}) {
  return <button onClick={handler}>{text}</button>;
}

function Stats({good, neutral, bad}) {
  const total = good + bad + neutral;
  return total ? (
    <>
    <h1>stats</h1>
    <table>
      <tbody>
      <tr><td>good</td><td>{good}</td></tr>
      <tr><td>neutral</td><td>{neutral}</td></tr>
      <tr><td>bad</td><td>{bad}</td></tr>
      <tr><td>all</td><td>{total}</td></tr>
      <tr><td>avg</td><td>{((good - bad) / total) || 0}</td></tr>
      <tr><td>positive</td><td>{(100 * good / total) || 0}%</td></tr>
      </tbody>
    </table>
    </>
  ) : <p>No feedback given</p>;
}

export default App;
