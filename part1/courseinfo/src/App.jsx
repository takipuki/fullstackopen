
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({course}) => <h1>{course}</h1>;


const Content = ({parts}) => {
  const Part = ({name, exercises}) => <p>{name} {exercises}</p>;
  return parts.map(
    (part, i) => <Part key={i} name={part.name} exercises={part.exercises} />
  )
};

const Total = ({parts}) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return (<p>Number of exercises {total}</p>);
};

export default App;
