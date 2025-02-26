interface ContentProps {
  courseParts: { 
    name: string; 
    exerciseCount: number; 
  }[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map(c => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;

