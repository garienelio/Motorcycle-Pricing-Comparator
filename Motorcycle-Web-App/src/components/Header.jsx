import React from "react";
import motorcycleLogo from '../assets/motorcycle-logo.svg'
import { Link} from 'react-router-dom'

export default function Header({name}){
    return (
        <header className="header">
          <img src={motorcycleLogo} className="header-motorcycle" />
          <h1>{name}</h1>
          <Link to='/listings'>Listings</Link>
          <Link to='/favorites'>Fav</Link>
        </header>
    );
}