import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './App.module.css';

function App() {
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key='1'>1st menu item</Menu.Item>
            <Menu.Item key='2'>2nd menu item</Menu.Item>
            <Menu.Item key='3'>3rd menu item</Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Searchbar />
            <div>
                <aside>
                    <section>
                        <label htmlFor='active'>Activos</label>
                        <input type='checkbox' name='active' id='active' />
                        <label htmlFor='inactive'>Inactivos</label>
                        <input type='checkbox' name='inactive' id='inactive' />
                    </section>
                </aside>
                <main>
                    <Dropdown overlay={menu}>
                        <a
                            className='ant-dropdown-link'
                            onClick={(e) => e.preventDefault()}
                        >
                            Hover me, Click menu item <DownOutlined />
                        </a>
                    </Dropdown>
                </main>
            </div>
        </div>
    );
}

export default App;
