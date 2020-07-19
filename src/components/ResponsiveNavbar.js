import React, {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App';
import {NavLink} from 'react-router-dom';
import {Navbar, NavbarBrand,Nav,NavbarToggler,Collapse,NavItem, Jumbotron, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap';

const NavBar = () => {
  const [isNavOpen, setisNavOpen] = useState(false);
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  
  const renderBtn = () => {
    if(state){
      return(
        <Nav navbar>
            <NavItem>
                <Button outline 
                    onClick = {()=>{
                  localStorage.clear();
                  dispatch({type: "CLEAR"});
                  history.push('/signin');
                }}>
                    Sign out
                </Button>
            </NavItem>
        </Nav> 
      );
    }
  }
  const renderList = () => {
    if(state){
      return (
        <Nav navbar>
          <NavItem>
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
              <NavLink className="nav-link" to="/mysubposts">Subscribed Posts</NavLink>
          </NavItem>
          <NavItem>
              <NavLink className="nav-link" to="/create">Post</NavLink>
          </NavItem>
        </Nav>
          
      );
    }
    else{
     return(
      <>
      <NavItem>
              <NavLink className="nav-link" to="/signin">Signin</NavLink>
        </NavItem>
        <NavItem>
              <NavLink className="nav-link" to="/signup">Signup</NavLink>
          </NavItem>
        
      </>
     );
    }
  }  
  return(
    <Navbar  fixed="top"  dark expand="md">                  
      <NavbarToggler onClick={()=>setisNavOpen(!isNavOpen)}/>
      <NavbarBrand className="mr-auto mylogo" href={state?"/":"/signin"}>Karunya Feed</NavbarBrand>
      <Collapse style={isNavOpen?{backgroundColor:"#ce93d8", padding:"10px", borderRadius:"5px", opacity:"95%"}:{backgroundColor:"none"}} isOpen={isNavOpen} navbar>
          <Nav navbar>
          {renderList()}
          </Nav>
          <Nav className="ml-auto" navbar>
          {renderBtn()}
          </Nav>
      </Collapse>

   </Navbar>
    
    );

};

export default NavBar;
