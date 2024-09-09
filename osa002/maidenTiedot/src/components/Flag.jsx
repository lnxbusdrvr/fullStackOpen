const Flag = ({ country }) => {
  return (
    <div>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
}

export default Flag;

