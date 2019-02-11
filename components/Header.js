import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default (props) => {
    //state = {}


   // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route="/index">
                <a className="item">CrowdCoin</a>
            </Link>

            <Menu.Menu position="right">
                <Link route="/index">
                    <a className="item">Campaigns</a>
                </Link>

                <Link route="/campaigns/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}



