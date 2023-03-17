import React, {useContext} from "react";
import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import {AlbumsContext} from "../../Contexts/albumsContext";

const MainNavbar=()=>{
    const {setSort,sortingDirection} = useContext(AlbumsContext);
        return(
            <Navbar collapseOnSelect expand="lg" variant="light">
                <Container>
                    <Navbar.Brand href="/">My Albums</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"/>
                        <Nav>
                            <NavDropdown title={`Sort by Title ${sortingDirection}`} id="collasible-nav-dropdown">
                                <NavDropdown.Item  onClick={() => setSort("ASC")}>Title ASC</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => setSort("DESC")}>Title DESC</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
}

export default MainNavbar;