const Persons = ({filterPersons, handleDelete}) => {
  return (
    <>
      {filterPersons.map(p =>
        <div key={p.name}>
          {p.name} {p.number} <button onClick={() => handleDelete(p.id, p.name)}>Delete</button>
        </div>
      )}
    </>
  )
}

export default Persons;
