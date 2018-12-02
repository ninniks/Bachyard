import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';

class Navbar extends Component {
    render(){
        return(
            <div>
                <Menu fixed='top' inverted>
                    <div className="item">
                        <img alt="" src={require('../img/bach_7122_sm.gif')} />
                    </div>
                    <Container>
                        <Menu.Item href="/" as='a' header>
                            <h2>Bachyard</h2>
                        </Menu.Item>
                        <Menu.Item href="/" as='a'>Home</Menu.Item>
                        <Menu.Item href="/search" as='a'>Search Events</Menu.Item>        
                    </Container>
                    <div style={{margin: "10px"}} className="right menu">
                        <div className="item">
                            <button onClick={ () => window.open("https://github.com/ninniks/Bachyard",'_blank') } className="fluid ui github button">
                                <i className="github icon"></i>
                                Fork on Github
                            </button>
                        </div>
                    </div>
                </Menu>
            </div>
        );
    }
}

export default Navbar;