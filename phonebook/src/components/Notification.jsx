const Notification = ({ message, type }) => {
    /** @type {React.CSSProperties} */
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20',
        borderStyle: 'solid',
        borderRadius: '5',
        padding: '10',
        marginBottom: '10'
    }

    /** @type {React.CSSProperties} */
    const notiStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20',
        borderStyle: 'solid',
        borderRadius: '5',
        padding: '20',
        marginBottom: '10'
    }

    const selectedStyle = (type === "noti") ? notiStyle : errorStyle

    if (message === null) {
        return null
    }

    return (
        <div style={selectedStyle}>
            <h2>{message}</h2>
        </div>
    )
}

export default Notification