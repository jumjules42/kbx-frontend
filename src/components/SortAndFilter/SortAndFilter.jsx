import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './SortAndFilter.module.css';

function SortAndFilter() {
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
        <aside className={styles.aside}>
            <section>
                <label htmlFor='active'>Activos</label>
                <input type='checkbox' name='active' id='active' />
            </section>
            <section>
                <label htmlFor='inactive'>Inactivos</label>
                <input type='checkbox' name='inactive' id='inactive' />
            </section>

            <Dropdown overlay={menu}>
                <button
                    className='ant-dropdown-link'
                    onClick={(e) => e.preventDefault()}
                >
                    Hover me, Click menu item <DownOutlined />
                </button>
            </Dropdown>
        </aside>
    );
}

export default SortAndFilter;
