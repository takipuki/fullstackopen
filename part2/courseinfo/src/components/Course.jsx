
function Course({course}) {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

function Header({course}) {
  return <h1>{course.name}</h1>;
}

function Content({parts}) {
  return parts.map(p => <Part key={p.id} part={p} />);
}

function Part({part}) {
  return <p>{part.name} {part.exercises}</p>;
}

function Total({parts}) {
  return (
    <p>
      <b>
        total of {parts.reduce((sum, v) => (sum + v.exercises), 0)} exercises
      </b>
    </p>
  );
}

export default Course;
