const Languages = ({ languages }) => {
  return (
    <div>
      <h3>languages</h3>
      <ul>
        {Object.entries(languages).map(([k, v]) => (
          <li key={k}>{v}</li>
        ))}
      </ul>
    </div>
  )
}


export default Languages;
