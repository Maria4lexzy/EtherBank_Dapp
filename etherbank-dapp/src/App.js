import "./App.css";
import Navigation from "./Components/Navigation";
import { Routes, Route } from "react-router-dom";
import Account from "./Containers/Account";
import CreateAccount from "./Containers/CreateAccount";
import ShowAccounts from "./Containers/ShowAccounts";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route exact path="/create" element={<CreateAccount />}></Route>
        <Route exact path="/" element={<ShowAccounts />}></Route>
        <Route exact path="/accounts/:id" element={<Account />}></Route>
      </Routes>
    </>
  );
}

export default App;