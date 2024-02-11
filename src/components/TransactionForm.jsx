import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { ethers } from 'ethers';

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
    //   await db.collection('transactions').add({
    //     walletAddress,
    //     amount,
    //   });

      // Clear form fields and errors
      setWalletAddress('');
      setAmount('');
      setErrors({});

      // Handle successful submission (e.g., display a success message)
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
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth error={errors.walletAddress}>
        <InputLabel htmlFor="wallet-address">Wallet Address</InputLabel>
        <TextField
          id="wallet-address"
          label="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          error={!!errors.walletAddress} // Set error prop based on truthy value
          helperText={errors.walletAddress} // Use helperText for error messages
        />
      </FormControl>
      <FormControl fullWidth error={errors.amount}>
        <InputLabel htmlFor="amount">Amount</InputLabel>
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
      <Button type="submit" variant="contained" color="primary">
        Submit Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
