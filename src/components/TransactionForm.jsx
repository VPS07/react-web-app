import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import {
  TextField,
  Button,
  FormControl,
} from '@mui/material';
import { ethers } from 'ethers';
import { db } from "../utils/firebase-config";

const TransactionForm = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate wallet address and amount
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Add data to Firestore
      await addDoc(collection(db, 'transactions'), {
        walletAddress,
        amount,
      });

      // Clear form fields and errors
      setWalletAddress('');
      setAmount('');
      setErrors({});

    } catch (error) {
      // Handle Firestore errors
      console.error('Firestore error:', error);
    }
  };

  const validateInputs = () => {
    const errors = {};

    // Wallet address validation
    if (!walletAddress) {
      errors.walletAddress = 'Wallet address is required';
    } else if (!isEthereumAddress(walletAddress)) {
      errors.walletAddress = 'Invalid Ethereum address format';
    }

    // Amount validation
    if (!amount) {
      errors.amount = 'Amount is required';
    } else if (isNaN(amount)) {
      errors.amount = 'Amount must be a number';
    } else if (amount < 0 || amount > 10000) {
      errors.amount = 'Amount must be between 0 and 10,000';
    }

    return errors;
  };

  const isEthereumAddress = (address) => {
    // Use ethers.js to validate Ethereum address format
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <FormControl
        fullWidth
        error={errors.walletAddress}
        sx={{ marginBottom: 4 }}
      >
        <TextField
          id="wallet-address"
          label="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          error={!!errors.walletAddress} // Set error prop based on truthy value
          helperText={errors.walletAddress} // Use helperText for error messages
        />
      </FormControl>
      <FormControl fullWidth error={errors.amount} sx={{ marginBottom: 4 }}>
        <TextField
          id="amount"
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={!!errors.amount}
          helperText={errors.amount}
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ outline: "none !important" }}>
        Submit Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
