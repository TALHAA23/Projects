function Nav(props) {
localStorage.setItem("notes",JSON.stringify({name:'somename'}))
    return(
        <nav className={props.darkMode?"dark":""}>
            <img className="nav--icon" src="../images/react-icon-small.png"/>
            <h1 className="nav--logo_text">React Facts</h1>
            
            <div className="toggler">
                <p className="toggler--light">Light</p>
                <div className="toggler--slider" onClick={props.handleModeChange}>
                    <div className="toggler--slider--circle"></div>
                </div>
                <p className="toggler--dark">Dark</p>
            </div>
        </nav>

    )
}


export default Nav;