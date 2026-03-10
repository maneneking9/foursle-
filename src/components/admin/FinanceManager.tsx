import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Plus, X, Trash2, Smartphone, CreditCard } from 'lucide-react';
import { api } from '../../lib/api';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FinanceManager() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ type: 'income', amount: '', description: '', date: '', category: '', paymentMethod: 'cash' });
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [trans, sum] = await Promise.all([api.getTransactions(), api.getFinanceSummary()]);
      setTransactions(trans);
      setSummary(sum);
      
      // Prepare chart data
      const monthlyData = trans.reduce((acc: any, t: any) => {
        const month = new Date(t.date).toLocaleDateString('en', { month: 'short' });
        if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 };
        if (t.type === 'income') acc[month].income += parseFloat(t.amount);
        else acc[month].expenses += parseFloat(t.amount);
        return acc;
      }, {});
      setChartData(Object.values(monthlyData));
      
      // Category breakdown
      const catData = trans.reduce((acc: any, t: any) => {
        if (!acc[t.category]) acc[t.category] = 0;
        acc[t.category] += parseFloat(t.amount);
        return acc;
      }, {});
      setCategoryData(Object.entries(catData).map(([name, value]) => ({ name, value })));
    } catch (error) {
      console.error('Failed to load:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.amount || !formData.description || !formData.date || !formData.category) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await api.createTransaction({
        type: formData.type,
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
        date: formData.date,
        payment_method: formData.paymentMethod
      });
      setShowModal(false);
      setFormData({ type: 'income', amount: '', description: '', date: '', category: '', paymentMethod: 'cash' });
      loadData();
    } catch (error) {
      alert('Failed to save');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await api.deleteTransaction(id);
      loadData();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Income</p>
              <p className="text-3xl font-bold text-green-700 mt-1">${summary.income.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Total Expenses</p>
              <p className="text-3xl font-bold text-red-700 mt-1">${summary.expenses.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <TrendingDown size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Balance</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">${summary.balance.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={80} fill="#8884d8" dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Plus size={20} /> Add Transaction
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Date</th>
              <th className="text-left px-6 py-4 font-semibold">Description</th>
              <th className="text-left px-6 py-4 font-semibold">Category</th>
              <th className="text-left px-6 py-4 font-semibold">Type</th>
              <th className="text-left px-6 py-4 font-semibold">Amount</th>
              <th className="text-left px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((trans) => (
              <tr key={trans.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{new Date(trans.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-medium">{trans.description}</td>
                <td className="px-6 py-4">{trans.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${trans.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {trans.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold">${trans.amount}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(trans.id)} className="p-2 hover:bg-red-50 rounded">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Transaction</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <select value={formData.paymentMethod} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option value="cash">Cash</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="bank">Bank Transfer</option>
                <option value="card">Card</option>
              </select>
              <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50">
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
