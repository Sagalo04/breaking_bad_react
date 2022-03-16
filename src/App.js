// import logo from "logo.svg";
import { Button, Loading } from "@nextui-org/react";
import "App.css";
import Details from "pages/Details/Details";
import Favs from "pages/Favs/Favs";
import Home from "pages/Home/Home";
import { connect } from "react-redux";
import { Route, Routes, Navigate, Link, useLocation } from "react-router-dom";
import { doGoogleLoginAction, logOutAction } from "reduxDucks/userDuck";

function App({ fetching, loggedIn, doGoogleLoginAction, logOutAction }) {
  const doLogin = () => {
    doGoogleLoginAction();
  };

  let location = useLocation()
  const logOut = () => {
    logOutAction();
    if(location.pathname === "/favs"){
      window.location.reload(false);
    }
  };

  return (
    <div className="App">
      {fetching ? (
        <Loading />
      ) : loggedIn ? (
        <>
          <Button onClick={logOut} clickable>
            Cerrar Sesión
          </Button>{" "}
          <Link to="/favs">
            <Button clickable>
              Mis Favoritos
            </Button>{" "}
          </Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<Details />} />
            <Route path="/favs" element={<Favs />} />
          </Routes>
        </>
      ) : (
        <>
          <Button onClick={doLogin} clickable>
            Iniciar Sesión
          </Button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<Details />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}

      {/* <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/character/:id" element={<Details />}></Route>
      </Routes> */}
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
