import React from 'react';
import styles from './Searchbar.module.css';

function Searchbar() {
    return (
        <header className={styles.header}>
                <input type='text' placeholder='Buscar' />
                <button>Buscar</button>
        </header>
    );
}

export default Searchbar;
