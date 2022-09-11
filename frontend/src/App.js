import React, { useState } from "react";
// import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import Layout from "./Components/Layout/Layout";
import RoutesP from "./Routes";
import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const ThemeContext = React.createContext(null);

const App = () => {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;

  return (
    
    <Router>
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />
        {/* <Helmet>
          <title>Sidebar - Code Focus</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Helmet> */}
        <>

            <Layout>
              <Routes>
                {/* <Route exact path="/">
                  <HomePage />
                </Route> */}
                <Route path="/statistics">
                  <h1>Statistics Page</h1>
                </Route>
                <Route path="/customers">
                  <h1>Customers Page</h1>
                </Route>
                <Route path="/diagrams">
                  <h1>Diagrams Page</h1>
                </Route>
              </Routes>
            </Layout>
        </>
                

      </ThemeProvider>
    </ThemeContext.Provider>
    
    </Router>
  );
};

export default App;
