const PersonForm = ({addPhonebook, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPhonebook}>
      <div>
        name: <input onChange={handleNameChange}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
