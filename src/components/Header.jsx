import React from "react";
import icon from '../assets/icon.png'
function Header() {
  return (
    <>
      <div className="w-full h-fit bg-cyan-900 text-white flex items-center justify-between font-semibold p-2">
        <img src={icon} alt="Todo app icone" className="w-10 h-10 mt-3"/>
        <h1 className="font-bold text-2xl">TodoApp</h1>
      </div>
    </>
  );
}

export default Header;
