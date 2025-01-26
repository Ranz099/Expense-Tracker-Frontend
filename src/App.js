import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import Expenses from './components/Expenses';
import ExpenseForm from './components/ExpenseForm';
import axios from 'axios';
import { fetchExpenses } from './api';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: ''
    });

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setCurrentUser(username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username'); // Clear the username from localStorage
        setCurrentUser(null); // Reset the user state
    };

    useEffect(() => {
        if(currentUser == null) return ;
        const getexpenses = async ()=> {
            let {data} = await fetchExpenses(currentUser)
            setExpenses(data)
        }
        getexpenses()
    }, [currentUser])

    return (
        <div className="container">
            {!currentUser ? (
                <AuthForm setCurrentUser={setCurrentUser} />
            ) : (
                <div>
                   <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '2px solid #ccc', // horizontal border
                        paddingBottom: '10px' // space below the text and button
                    }}>
                        <h1 style={{
                            fontFamily:'Arial, sans-serif', // fancy font
                            fontWeight: 'bold',
                            color: '#333' // stylish color
                        }}>Expense Tracker</h1>
                        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                    </div>
                    <ExpenseForm username={currentUser} setExpenses={setExpenses} formData={formData} setFormData={setFormData} />
                    <Expenses username={currentUser} expenses={expenses} setExpenses={setExpenses} setFormData={setFormData} />
                </div>
            )}
        </div>
    );
}

export default App;
