const Person = ({ person, deletePerson }) => {
    return (
        <>
            <tr>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </tr>
        </>
    )
}

export default Person