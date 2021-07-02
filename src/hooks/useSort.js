function useSort(array, key, ord) {
    const auxArray = array.map((el) => ({ ...el }));

    if (ord === 'asc') {
        return auxArray.sort((a, b) => {
            if (a[key] > b[key]) {
                return 1;
            }
            if (a[key] < b[key]) {
                return -1;
            }
            return 0;
        });
    } else {
        return auxArray.sort((a, b) => {
            if (a[key] > b[key]) {
                return -1;
            }
            if (a[key] < b[key]) {
                return 1;
            }
            return 0;
        });
    }
}

export default useSort;
