const Languages = ({ langs }) => {
    return (
        <div>
            <ul>
                {langs.map(lang => (
                    <li key={lang}>
                        {lang}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Languages