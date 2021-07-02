import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Pagination } from 'antd';

import styles from './App.module.css';

const serverUrl = 'https://www.json-generator.com/api/json/get/bVSwHveeMi';

function App() {
    const [companies, setCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getData = async () => {
        const data = await axios.get(serverUrl);
        setCompanies(data.data);
    };

    useEffect(() => {
        getData();
    }, []);

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

    const indexOfLastCompany = currentPage * rowsPerPage;
    const indexOfFirstCompany = indexOfLastCompany - rowsPerPage;
    const currentCompanies = companies.slice(
        indexOfFirstCompany,
        indexOfLastCompany
    );

    return (
        <div className={styles.container}>
            <Searchbar />
            <div className={styles.dataContainer}>
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
                <main className={styles.main}>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Comercio</th>
                            <th>CUIT</th>
                            <th>Concepto 1</th>
                            <th>Concepto 2</th>
                            <th>Concepto 3</th>
                            <th>Concepto 4</th>
                            <th>Concepto 5</th>
                            <th>Concepto 6</th>
                            <th>Balance actual</th>
                            <th>Activo</th>
                            <th>Ultima venta</th>
                        </tr>
                        {currentCompanies.map((el) => (
                            <tr>
                                <td>{el.id}</td>
                                <td>{el.comercio}</td>
                                <td>{el.cuit}</td>
                                <td>{el.conceptoA}</td>
                                <td>{el.conceptoB}</td>
                                <td>{el.conceptoC}</td>
                                <td>{el.conceptoD}</td>
                                <td>{el.conceptoE}</td>
                                <td>{el.conceptoF}</td>
                                <td>{el.balance}</td>
                                <td>{el.activo}</td>
                                <td>{el.ultVenta}</td>
                            </tr>
                        ))}
                    </table>
                    <Pagination
                        defaultCurrent={currentPage}
                        total={companies.length}
                    />
                </main>
            </div>
        </div>
    );
}

export default App;
