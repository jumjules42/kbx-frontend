import React from 'react';
import styles from './Searchbar.module.css';
import { ReloadOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { serverUrl } from '../../constants';
import axios from 'axios';

const { Search } = Input;

function Searchbar({ setCompanies }) {
    const handleSearch = async (value) => {
        console.log(
            `${serverUrl}&q={"$or":[{"comercio":{"$regex":"^${value}"}},{"cuit":{"$regex":"^${value}"}},{"id":{"$regex":"^${value}"}}]}`
        );
        const dataSearch = await axios.get(
            `${serverUrl}&q={"$or":[{"comercio":{"$regex":"^${value}"}},{"cuit":{"$regex":"^${value}"}},{"id":{"$regex":"^${value}"}}]}`
        );
        if (dataSearch.data) {
            return setCompanies(dataSearch.data);
        }

        return (
            <div className={styles.notFound}>
                <p className={styles.notFound__p}>
                    No se encontraron resultados.
                </p>
                <Button
                    type='primary'
                    shape='circle'
                    icon={<ReloadOutlined />}
                    size='large'
                    onClick={async () => {
                        const data = await axios.get(serverUrl);
                        setCompanies(data);
                    }}
                />
            </div>
        );
    };

    return (
        <header className={styles.header}>
            <Search
                className={styles.searchbar}
                size='large'
                placeholder='Buscar...'
                enterButton
                onSearch={handleSearch}
            />
        </header>
    );
}

export default Searchbar;
