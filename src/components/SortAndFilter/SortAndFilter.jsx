/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import useSort from '../../hooks/useSort';
import styles from './SortAndFilter.module.css';

function SortAndFilter({ companies, setCompanies }) {
    const [auxCompanies] = useState(companies.map((el) => ({ ...el })));

    const handleSortByActive = (e) => {
        const value = e.target.value;
        if (value === 'active') {
            return setCompanies(auxCompanies.filter((el) => el.activo));
        }
        if (value === 'inactive') {
            return setCompanies(auxCompanies.filter((el) => !el.activo));
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
        const radios = new Set([
            ...document.getElementsByName('actives'),
            ...document.getElementsByName('names'),
        ]);

        radios.forEach((el) => {
            el.checked = false;
        });
        setCompanies(auxCompanies);
    };

    return (
        <aside className={styles.aside}>
            <section className={styles.checkbox}>
                <h3>Filtrar por activos</h3>

                <label className={styles.checkbox__label} htmlFor='active'>
                    <input
                        onChange={handleSortByActive}
                        type='radio'
                        name='actives'
                        id='active'
                        value='active'
                    />
                    Activos
                </label>

                <label className={styles.checkbox__label} htmlFor='inactive'>
                    <input
                        onChange={handleSortByActive}
                        type='radio'
                        name='actives'
                        id='inactive'
                        value='inactive'
                    />
                    Inactivos
                </label>
            </section>

            <br />

            <section className={styles.checkbox}>
                <h3>Ordenar por...</h3>

                <label className={styles.checkbox__label} htmlFor='nameAsc'>
                    <input
                        onChange={handleSort}
                        type='radio'
                        name='names'
                        id='nameAsc'
                        value='nameAsc'
                    />
                    Nombre ascendente
                </label>

                <label className={styles.checkbox__label} htmlFor='nameDes'>
                    <input
                        onChange={handleSort}
                        type='radio'
                        name='names'
                        id='nameDes'
                        value='nameDes'
                    />
                    Nombre descendente
                </label>

                <label className={styles.checkbox__label} htmlFor='cuitAsc'>
                    <input
                        onChange={handleSort}
                        type='radio'
                        name='names'
                        id='cuitAsc'
                        value='cuitAsc'
                    />
                    CUIT ascendente
                </label>

                <label className={styles.checkbox__label} htmlFor='cuitDes'>
                    <input
                        onChange={handleSort}
                        type='radio'
                        name='names'
                        id='cuitDes'
                        value='cuitDes'
                    />
                    CUIT descendente
                </label>
            </section>

            <button onClick={clearFilters} value='none'>
                Borrar filtros
            </button>
        </aside>
    );
}

export default SortAndFilter;
