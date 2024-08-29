import Part from './Part';

const Content = (props) => {
  return (
    <div>
      {props.parts.map(p => (
       <Part key={p.id} part={p.name} exercise={p.exercises} />
      ))}
    </div>
  )
}

export default Content 
