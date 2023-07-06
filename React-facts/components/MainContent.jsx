function Main(props) {
    return(
        <main  className={props.darkMode?"dark":""} >
            <h1 className="main--title">Fun Facts About React</h1>
            <ul className="main--facts">
                <li>Was first released in 2013</li>
                <li>Was originally created by Jordan</li>
                <li>Has over 100k star on Github</li>
                <li>Is maintained by Meta</li>
                <li>Power thoursand of enterprise appes, inlcudeing mobile apps</li>
            </ul>
        </main>
    )
}

export default Main;