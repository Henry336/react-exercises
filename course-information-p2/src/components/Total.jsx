const Total = ({ parts }) => {
  let temp = parts.map(part => part.exercises)
  let total = temp.reduce((x, y) => x + y)
  console.log("Total works...")

  return (
    <>
      <p><strong>total of {total} exercises</strong></p>
    </>
  )
}

export default Total