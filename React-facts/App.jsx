import React from "react";
import Nav from "./components/Nav";
import Main from "./components/MainContent";

export default function App() {

const [isDarkMode, setDarkMode] = React.useState(false);

function changeMode() {
   setDarkMode(prevMode=> !prevMode);
}
   return(
      <div>
         <Nav 
               darkMode={isDarkMode}
               handleModeChange={changeMode}
         />
         <Main
               darkMode={isDarkMode}
         />
      </div>
   )
}
