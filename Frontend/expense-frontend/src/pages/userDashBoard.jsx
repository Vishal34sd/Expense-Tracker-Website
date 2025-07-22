import React from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { useState , useEffect} from "react"
import axios from "axios";
import { getToken } from "../utils/token";
import { decodeToken } from "../utils/token";
ChartJS.register(ArcElement, Tooltip, Legend);

const UserDashboard = () => {

  
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/get",{
        headers : {
          Authorization : `Bearer ${getToken()}`
        }
      });
      
      setTransaction(res.data.data);
    }
    catch (err) {
      console.log(err)
    }
  }
  const decodedData = decodeToken(getToken())

  const totalEarning = transaction.filter((item)=>item.type==="income").reduce((sum, item)=>sum +item.amount, 0);
  const totalSpent = transaction.filter((item)=>item.type==="expense").reduce((sum, item)=>sum +item.amount, 0);
  const availableBalance = totalEarning - totalSpent

  const pieData = {
    labels:[...new Set(transaction.map((item) => item.category))],
    datasets: [
      {
        label: "Your Expenses",
        data:  transaction.map((item) => item.amount),
        backgroundColor: [ "#14b8a6", "#6366f1", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6", "#f43f5e"  ],
        borderColor: "#1e293b",
        borderWidth: 1,

      }
    ]
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex">

      <aside className="w-64 bg-gray-900 border-r border-gray-700 p-6 hidden sm:block">
        <h2 className="text-2xl font-bold text-teal-400 mb-8 text-center">ExpenseTracker</h2>
        <nav className="space-y-4 text-sm text-gray-300">
          <Link to="/" className="block hover:text-teal-400">🏠 Dashboard</Link>
          <Link to="/addTransaction"  className="block hover:text-teal-400">📜 See All Transactions</Link>
          <Link  className="block hover:text-teal-400">📊 View Summary</Link>
          <Link to="/add" className="block hover:text-teal-400">➕ Add New Expense</Link>
          <a href="#" className="block hover:text-teal-400">⚙️ Settings</a>
          <a href="#" className="block hover:text-teal-400">🚪 Logout</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-teal-400 mb-2">Welcome, {decodedData.username}</h1>
        <p className="text-gray-400 mb-8">Here’s your financial overview:</p>

       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
  <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
    <h2 className="text-xl font-semibold text-teal-300"> Total Earnings</h2>
    <p className="text-3xl font-bold mt-2 text-green-400">₹ {totalEarning}</p>
  </div>

  <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
    <h2 className="text-xl font-semibold text-teal-300"> Amount Spent</h2>
    <p className="text-3xl font-bold mt-2 text-red-400">₹ {totalSpent}</p>
  </div>

  <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
    <h2 className="text-xl font-semibold text-teal-300">Available Balance</h2>
    <p className="text-3xl font-bold mt-2 text-yellow-400">₹ {availableBalance}</p>
  </div>

  <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
    <h2 className="text-xl font-semibold text-teal-300">Number of Transactions</h2>
    <p className="text-3xl font-bold mt-2 text-white">{transaction.length}</p>
  </div>
</div>

        <div className="mt-10 bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-teal-300 mb-4">Recent Expenses</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span>🍔 Food - ₹500 <span className="text-gray-500 ml-2">July 20</span></span>
             
            </li>
            <li className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span>📚 Books - ₹800 <span className="text-gray-500 ml-2">July 18</span></span>
             
            </li>
            <li className="flex justify-between items-center">
              <span>🚕 Transport - ₹300 <span className="text-gray-500 ml-2">July 16</span></span>
             
            </li>
          </ul>
        </div>
        <div className="w-fit h-auto m-auto mt-5">
          <h3 className="text-white text-3xl font-semibold mb-8">Expense Distribution</h3>
        <Pie data={pieData}/>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
