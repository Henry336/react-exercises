const Filter = ({ name, func }) => {
    return (
        <>
            <form>
                filter shown with <input value={name} onChange={func}/>
            </form>
        </>
    )
}

export default Filter