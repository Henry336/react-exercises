const SubHeader = ({ text }) => {
  console.log("Subheader works...")
  return (
    <>
      <h3>{text}</h3>
    </>
  )
}

const Part = ({ part }) => {
  const name = part.name
  const exercises = part.exercises
  console.log("Part works...")
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

const Course = ({ course }) => {
  const id = course.id
  const name = course.name
  const parts = course.parts

  console.log("Course works...")
  return (
    <div>
      <SubHeader text={name}/>
      {parts.map(part => (
        <Part key={part.id} part={part}/>
      ))}
    </div>
  )
}

export default Course