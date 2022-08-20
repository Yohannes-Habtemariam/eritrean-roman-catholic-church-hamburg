import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Choir from "./views/choirPage/Choir";
import ChurchService from "./views/churchServicePage/ChurchService";
import Community from "./views/communityPage/Community";
import Contact from "./views/contactPage/Contact";
import Login from "./views/loginPage/Login";
import Register from "./views/registerPage/Register";
import Children from "./views/childrenPage/Children";
import NotFound from "./views/notFoundPage/NotFound";
import Report from "./views/reportPage/Report";


// a useContext hook to access the value of the context is used for the entire application
export const MyContext = React.createContext();

function App() {
  // The useState hook that is used to create a state variable and set its initial value.
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [songs, setSongs] = useState([]);
  const [finances, setFinances] = useState([]);
  const [sacraments, setSacraments] = useState([]);
  const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false);
  const [consent, setConsent] = useState(false);
  const [ token, setToken ] = useState(false);

  // Token local storage useEffect hook to set the token state variable
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setToken(token);
      setIsUserLoggedIn(true);
      setUsers(data.id)
    }
  }, []);


// The useEffect hook is used to run a piece of code on a specific condition.
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/finances");
      const data = await response.json();

      try{
        if(response.ok) {
          setFinances(data);
        } else {
          throw new Error("Something went wrong");
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // The useEffect on the sacraments mount to run the sacraments report
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/sacraments");
      const data = await response.json();

      try{
        if(response.ok) {
          setSacraments(data);
        } else {
          throw new Error("Something went wrong");
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, []);


  return (
    <MyContext.Provider value={{users, setUsers, messages, setMessages, songs, setSongs, finances, setFinances, sacraments, setSacraments, isUserLoggedIn, setIsUserLoggedIn, token, setToken, consent, setConsent}}>
      <div className="App">
        <Router>
          <header>
            <Navigation />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Community/>} />
              <Route path="/service" element={<ChurchService />} />
              <Route path="/choir" element={<Choir />} />
              <Route path="/children" element={<Children/>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/report" element={<Report/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>
          <footer></footer>
        </Router>
      </div>
    </MyContext.Provider>
  );
}

export default App;
