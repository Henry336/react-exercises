const AddForm = ({ newName, newNumber, nameFunc, numberFunc, submitFunc }) => {
    return (
        <>
            <form onSubmit={submitFunc}>
                <table>
                <tbody>
                <tr>
                    <td>name: </td>
                    <td><input value={newName} onChange={nameFunc}/></td>
                </tr>
                <tr>
                    <td>number: </td>
                    <td><input value={newNumber} onChange={numberFunc}/></td>
                </tr>
                </tbody>
                </table>
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default AddForm