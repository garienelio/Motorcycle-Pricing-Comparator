import React from "react";
import motorcycleLogo from '../assets/motorcycle-logo.svg'

export default function Header({name}){
    return (
        <header className="header">
          <img src={motorcycleLogo} className="header-motorcycle" />
          <h1>{name}</h1>
        </header>
    );
}