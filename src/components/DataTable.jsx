import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../utils/firebase-config";


const DataTable = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        //fetach save data from firebase database
        const fetchTransactions = async () => {
            const transactionsRef = collection(db, 'transactions');
            const transactionsQuery = query(transactionsRef);
            const querySnapshot = await getDocs(transactionsQuery);

            const fetchedTransactions = [];
            querySnapshot.forEach((doc) => {
                fetchedTransactions.push({ id: doc.id, ...doc.data() });
            });

            setTransactions(fetchedTransactions);
        };

        fetchTransactions();
    }, []);

    // Data Grid columns name and width
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'walletAddress', headerName: 'Wallet Address', width: 400 },
        { field: 'amount', headerName: 'Amount', width: 80 },
    ];

    return (
        <DataGrid
            rows={transactions}
            columns={columns}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ width: { xs: "90%", sm: "70%" } }}
        />
    );
};

export default DataTable;
