import React from "react";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <NavLink to={"/create"}>
        <div>Create a DID</div>
      </NavLink>
      <NavLink to={"/load"}>
        <div>Load a existing DID</div>
      </NavLink>
    </div>
  );
};

export default Home;
