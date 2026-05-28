const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  const arr = props.parts
  return (
    <>
      <Part part={arr[0].name} exercises={arr[0].exercises} />
      <Part part={arr[1].name} exercises={arr[1].exercises} />
      <Part part={arr[2].name} exercises={arr[2].exercises} />
    </>
  )
}

const Total = (props) => {
  const arr = props.parts
  return (
    <>
      <p>Number of exercises {arr[0].exercises + arr[1].exercises + arr[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
