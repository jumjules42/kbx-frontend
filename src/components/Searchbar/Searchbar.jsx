import React from 'react';
import styles from './Searchbar.module.css';

function Searchbar() {
    return (
        <header>
            <div>
                <input type='text' />
                <button>Buscar</button>
            </div>
        </header>
    );
}

export default Searchbar;
