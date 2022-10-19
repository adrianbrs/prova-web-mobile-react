import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import './style.css'

import appLogo from '../../assets/img/logo.png'

const AppHeader = () => {
    return (
        <header>
            <Navbar expand='md'>
                <Container>
                    <Navbar.Brand>
                        <Link to="/dashboard"><img src={appLogo} alt='Patrimônios' width='36' /></Link>
                    </Navbar.Brand>

                    <Navbar.Toggle className="toggle-icon">
                        <i className='fa fa-bars' style={{ color: 'white' }}></i>
                    </Navbar.Toggle>

                    <Navbar.Collapse className='justify-content-end'>
                        <Nav>
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/departamentos">Departamento</Nav.Link>
                            <Nav.Link as={Link} to="/categorias">Categorias</Nav.Link>
                            <Nav.Link as={Link} to="/patrimonios">Patrimônios</Nav.Link>
                            <div className="divisor"></div>
                            <Nav.Link href="/">Sair</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    )
}

export default AppHeader;