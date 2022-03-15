// import logo from "logo.svg";
import { Button, Loading } from "@nextui-org/react";
import "App.css";
import Details from "pages/Details/Details";
import Home from "pages/Home/Home";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { doGoogleLoginAction, logOutAction } from "reduxDucks/userDuck";

function App({ fetching, loggedIn, doGoogleLoginAction, logOutAction }) {
  const doLogin = () => {
    doGoogleLoginAction();
  };

  const logOut = () => {
    logOutAction();
  };

  return (
    <div className="App">
      {fetching ? <Loading /> : loggedIn ? <Button onClick={logOut} clickable>Cerrar Sesión</Button> : <Button onClick={doLogin} clickable>Iniciar Sesión</Button>}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/character/:id" element={<Details />}></Route>
      </Routes>
    </div>
  );
}

const mapState = ({ user: { fetching, loggedIn } }) => {
  return {
    fetching,
    loggedIn,
  };
};

export default connect(mapState, { doGoogleLoginAction, logOutAction })(App);
