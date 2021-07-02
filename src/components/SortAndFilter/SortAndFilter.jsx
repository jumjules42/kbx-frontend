/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Menu, Dropdown, message, Radio } from 'antd';
import {
    DownOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
} from '@ant-design/icons';

import useSort from '../../hooks/useSort';
import styles from './SortAndFilter.module.css';

function SortAndFilter({ companies, setCompanies }) {
    const [auxCompanies] = useState(companies.map((el) => ({ ...el })));

    const handleSortByActive = (e) => {
        const value = e.target.value;
        if (value === 'active') {
            return setCompanies(auxCompanies.filter((el) => el.activo === 1));
        }
        if (value === 'inactive') {
            return setCompanies(auxCompanies.filter((el) => el.activo === 0));
        }
    };

    const handleSort = (e) => {
        const value = e.target.value;
        if (value === 'nameAsc') {
            setCompanies(useSort(companies, 'comercio', 'asc'));
        } else if (value === 'cuitAsc') {
            setCompanies(useSort(companies, 'cuit', 'asc'));
        } else if (value === 'nameDes') {
            setCompanies(useSort(companies, 'comercio', 'des'));
        } else {
            setCompanies(useSort(companies, 'cuit', 'des'));
        }
    };

    const clearFilters = () => {
        const radios = document.getElementsByName('radio');
        console.log(radios);
        radios.forEach((el) => (el.value = ''));
        setCompanies(auxCompanies);
    };

    return (
        <aside className={styles.aside}>
            <button onClick={clearFilters} value='none'>
                Ninguno
            </button>

            <Radio.Group onChange={handleSortByActive} buttonStyle='solid'>
                <Radio.Button value='active'>Activos</Radio.Button>
                <Radio.Button value='inactive'>Inactivos</Radio.Button>
            </Radio.Group>

            <Radio.Group onChange={handleSort} buttonStyle='solid'>
                <Radio.Button value='nameAsc'>Nombre ascendente</Radio.Button>
                <Radio.Button value='nameDes'>Nombre descendente</Radio.Button>
                <Radio.Button value='cuitAsc'>CUIT ascendente</Radio.Button>
                <Radio.Button value='cuitDes'>CUIT descendente</Radio.Button>
            </Radio.Group>
        </aside>
    );
}

export default SortAndFilter;
