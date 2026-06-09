const Filter = ({ name, f }) => {
    return (
        <div>
            <form>
                find countries <input value={name} onChange={f}/>
            </form>
        </div>
    )
}

export default Filter