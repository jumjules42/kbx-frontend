import React, { useState, useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import axios from 'axios';
import SortAndFilter from './SortAndFilter/SortAndFilter';
import Searchbar from './Searchbar/Searchbar';
import { serverUrl } from '../constants';
import styles from './App.module.css';

function App() {
    const [companies, setCompanies] = useState([]);
    const [auxCompanies, setAuxCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const data = await axios.get(serverUrl);
            setCompanies(data.data);
            setAuxCompanies(data.data);
            return setLoading(false);
        } catch (error) {
            setLoading(false);
            alert(error);
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleChangePage = (page, rows) => {
        setCurrentPage(page);
        setRowsPerPage(rows);
    };

    const indexOfLastCompany = currentPage * rowsPerPage;
    const indexOfFirstCompany = indexOfLastCompany - rowsPerPage;
    const currentCompanies = companies.slice(
        indexOfFirstCompany,
        indexOfLastCompany
    );

    return (
        <div className={styles.container}>
            <Searchbar setCompanies={setCompanies} />
            <div className={styles.dataContainer}>
                <SortAndFilter
                    companies={companies}
                    setCompanies={setCompanies}
                    getData={getData}
                    auxCompanies={auxCompanies}
                />
                <main className={styles.main}>
                    {loading && (
                        <div className={styles.spinLoad}>
                            <h3>La tabla esta cargando...</h3>
                            <Spin size='large' />
                        </div>
                    )}
                    <table>
                        <thead>
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
                        </thead>
                        <tbody>
                            {currentCompanies.map((el, idx) => (
                                <tr key={`row-${idx}`}>
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
                                    <td>{`${el.activo}`}</td>
                                    <td>{el.ultVenta}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        className={styles.pagination}
                        defaultCurrent={1}
                        current={currentPage}
                        total={companies.length}
                        onChange={handleChangePage}
                    />
                </main>
            </div>
        </div>
    );
}

export default App;
