import React from 'react';

function Expenses({ username, expenses, setExpenses, setEditingExpense, setFormData }) {
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/expenses/${username}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setExpenses(expenses.filter(expense => expense.id !== id));
                alert('Expense deleted successfully!');
            } else {
                alert('Failed to delete expense.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete expense due to network error.');
        }
    };

    const handleEdit = (expense) => {
        setFormData(expense);
    };

    return (
        <div>
            <h2>Expenses List:</h2>
            {expenses.length > 0 ? (
                expenses.map(expense => (
                    <div key={expense.id} className="alert alert-secondary">
                        <p>{expense.title} - ₹{expense.amount} - {expense.category}</p>
                        <button onClick={() => handleEdit(expense)} className="btn btn-info" style={{ marginRight: '10px' }}>Edit</button>
                        <button onClick={() => handleDelete(expense.id)} className="btn btn-danger">Delete</button>
                
                    </div>
                ))
            ) : (
                <p>No expenses recorded yet.</p>
            )}
        </div>
    );
}

export default Expenses;
