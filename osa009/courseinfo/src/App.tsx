import courseParts from './entries'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'


const App = () => {
  const courseName = "Half Stack application development";
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
