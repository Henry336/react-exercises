import Course from "./components/Course"
import Total from "./components/Total"

const Header = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  console.log("App works...")
  return (
    <>
      <Header text={"Web development curriculum"}/>
      {courses.map(course => (
        <div key={course.id}>
          <Course course={course} />
          <Total parts={course.parts}/>
        </div>
      ))}
    </>
  )
}

export default App
