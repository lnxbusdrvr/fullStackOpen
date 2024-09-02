const Persons = ({filterPersons}) => {
  return (
    <>
      {filterPersons.map(p =>
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      )}
    </>
  )
}

export default Persons;
