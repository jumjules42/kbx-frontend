import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { Input, Modal } from 'antd';
import { serverUrl } from '../../constants';
import axios from 'axios';

const { Search } = Input;

function Searchbar({ setCompanies }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSearch = async (value) => {
        console.log(
            `${serverUrl}&q={"$or":[{"comercio":{"$regex":"^${value}"}},{"cuit":{"$regex":"^${value}"}},{"id":{"$regex":"^${value}"}}]}`
        );
        const dataSearch = await axios.get(
            `${serverUrl}&q={"$or":[{"comercio":{"$regex":"^${value}"}},{"cuit":{"$regex":"^${value}"}},{"id":{"$regex":"^${value}"}}]}`
        );
        if (dataSearch.data.length > 0) {
            return setCompanies(dataSearch.data);
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        window.location.reload();
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
            <Modal title='Error' visible={isModalVisible} onOk={handleOk}>
                <p>No se encontraron resultados para su busqueda.</p>
            </Modal>
        </header>
    );
}

export default Searchbar;
