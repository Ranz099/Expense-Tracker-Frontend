import React, { useState } from 'react';
import { createExpense, updateExpense } from '../api';

function ExpenseForm({ username, setExpenses , formData, setFormData}) {
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.title || formData.amount === 0 || !formData.category) {
            alert('All fields are required');
            return;
        }
        try {
            let response;
            if (formData.id) { // Assuming `formData` has an `id` field when updating
                response = await updateExpense(username, formData.id, formData);
            } else {
                response = await createExpense(username, formData);
            }
            if (response.status === 200) {
                setExpenses(prevExpenses => {
                    return formData.id ? prevExpenses.map(item => item.id === formData.id ? response.data : item) : [...prevExpenses, response.data];
                });
                window.location.reload()
                alert('Expense added/updated successfully!');
            } else {
                alert(`Failed to add/update expense: ${response.statusText}`);
            }
        } catch (error) {
            alert(`Failed to add/update expense: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <input type="text" className="form-control mt-2" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" required />
            <input type="number" className="form-control mt-2" name="amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="Amount" required />
            <input type="text" className="form-control mt-2" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Category" required />
            <button type="submit" className="btn btn-success mt-3">Add Expense</button>
        </form>
    );
}

export default ExpenseForm;
