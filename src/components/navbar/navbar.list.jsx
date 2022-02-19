import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import NavItem from "./navbar.item";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../data/actions";
import { Nav } from "react-bootstrap";

const AdminNavbarList = ({ isActive, location }) => {
  const [adminView, setAdminView] = useState(true);

  return (
    <>
      {adminView ? (
        <>
          <NavItem
            link="/dashboard/admin/products"
            name="Gestionar productos"
            listStyle={isActive(location, "/dashboard/admin/products")}
          />
          <NavItem
            link="/dashboard/admin/sales"
            name="Gestionar ventas"
            listStyle={isActive(location, "/dashboard/admin/sales")}
          />
          <NavItem
            link="/dashboard/admin/users"
            name="Gestionar usuarios"
            listStyle={isActive(location, "/dashboard/admin/users")}
          />
        </>
      ) : (
        <NormalNavbarList
          isActive={isActive}
          location={location}
          isAuth={true}
        />
      )}
      <button className="btn btn-success" onClick={() => setAdminView(!adminView)}>
        {adminView ? "Ver como usuario" : "Ver como admin"}
      </button>
    </>
  );
};

const NormalNavbarList = ({ isActive, location, isAuth = false }) => {
  const cart = useSelector((state) => state.products.cart);

  return (
    <>
      <NavItem link="/" name="Home" listStyle={isActive(location, "/")} />
      <NavItem
        link="/cart"
        name={`Carrito ${cart.length}`}
        listStyle={isActive(location, "/cart")}
      />
      {isAuth && (
        <NavItem
          link="/user"
          name="Mi perfil"
          listStyle={isActive(location, "/user")}
        />
      )}
    </>
  );
};

const NavbarList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  // to define the actual route
  const location = useLocation();

  // make active nav item with text primary
  const isActive = (location, path) => {
    // console.log(location);
    if (location.pathname === path) {
      return { fontWeight: "bold" };
    } else {
      return {};
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Nav Nav className="me-auto " >
      <div className="d-flex">
        {isAuth && user && user.role === 1 ? (
          <AdminNavbarList isActive={isActive} location={location} />
        ) : (
          <NormalNavbarList
            isActive={isActive}
            location={location}
            isAuth={isAuth}
          />
        )}
        {isAuth ? (
          <Button
            title="Salir"
            moreStyle="hover:text-primary "
            action={handleLogout}
          />
        ) : (
          <div className="d-flex gap-3">
            <Button
              title="Login"
              href="/login"
              isButton={false}
              isToLogin={false}
            />
            <Button
              title="Registrarse"
              href="/register"
              isButton={false}
              isToLogin={false}
            />
          </div>
        )}
      </div>
      <form className="d-flex ms-3">
        <input className="form-control me-2 text-login" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success text-login" type="submit">Search</button>
      </form>
    </Nav >
  );
};

export default NavbarList;
