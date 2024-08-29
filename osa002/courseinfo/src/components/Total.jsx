const Total = (props) => {
  return (
    <p>
    <b>
    Total of {
      props
        .parts
        .reduce((sum, current) => {
          return (sum + current.exercises)
        }, 0) } exercises 
    </b>
    </p>
  )
}

export default Total;
