const Person = ({ person, deletePerson }) => {
    return (
        <>
            <tr>
                <td>{person.name}</td>
                <td>{person.number}</td>
            </tr>
            <button onClick={() => deletePerson(person.id)}>delete</button>
    
        </>
    )
}

export default Person