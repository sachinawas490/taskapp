import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/data";

export default function Home() {
    const [todo, setTodo] = useState("");
    const [allTodos, setAllTodos] = useState([{ id: 1, "todo": "temp todo", "completed": false }]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown toggle
    function handleSignOut(){
        localStorage.removeItem('userToken')
    }
    useEffect(() => {
        async function fetchTodos() {
            try {
                if (!token) {
                    alert("Unauthorized user, please log in.");
                    return;
                }
                const response = await axios.get(`${url}/todos/todo`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllTodos(response.data.data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        }
        fetchTodos();
    }, [token]);

    async function handleClick() {
        if (!token) {
            navigate("/");
        } else {
            try {
                let data = { todo };
                const response = await axios.post(`${url}/todos/todo`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.status === 201) {
                    alert(response.data.message);
                    setAllTodos((prev) => [...prev, { _id: response.data.id, todo, completed: false }]);
                    setTodo("");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    function openModal(todo) {
        setSelectedTodo(todo);
    }

    function closeModal() {
        setSelectedTodo(null);
    }

    async function handleUpdate() {
        try {
            if (token) {
                const response = await axios.put(
                    `${url}/todos/todo/${selectedTodo._id}`,
                    { todo: selectedTodo.todo, completed: selectedTodo.completed },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 200) {
                    setAllTodos((prev) =>
                        prev.map((t) => (t._id === selectedTodo._id ? selectedTodo : t))
                    );
                    alert("todo successfully updated");
                    closeModal();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete() {
        try {
            const response = await axios.delete(`${url}/todos/todo/${selectedTodo._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setAllTodos((prev) => prev.filter((t) => t._id !== selectedTodo._id));
                alert("todo successfully deleted");
                closeModal();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem("userToken");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
            {/* Navbar */}
            <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        TaskMaster
                    </h1>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center px-4 py-2 text-gray-300 hover:text-white focus:outline-none"
                        >
                            Account
                            <svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-xl py-2">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-white"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-white"
                                >
                                    Register
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-white"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Your Todos
                </h2>

                {/* Input Box */}
                <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-xl mb-10">
                    <input
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="w-full max-w-md p-3 rounded-lg border-2 border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition"
                        placeholder="Add a new todo..."
                    />
                    <button
                        onClick={handleClick}
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition shadow-md"
                    >
                        Add Todo
                    </button>
                </div>

                {/* Todo List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allTodos.length > 0 &&
                        allTodos.map((val) => (
                            <div
                                key={val._id}
                                onClick={() => openModal(val)}
                                className="bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl hover:bg-gray-700 transition cursor-pointer"
                            >
                                <h3 className="text-xl font-semibold text-yellow-400 truncate">{val.todo}</h3>
                                <p className="mt-2 text-gray-300">
                                    Status: <span className="font-medium">{val.completed ? "✅ Done" : "❌ Pending"}</span>
                                </p>
                            </div>
                        ))}
                </div>

                {/* Modal */}
                {selectedTodo && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md text-white">
                            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Edit Todo</h2>
                            <input
                                type="text"
                                value={selectedTodo.todo}
                                onChange={(e) => setSelectedTodo({ ...selectedTodo, todo: e.target.value })}
                                className="w-full p-3 rounded-lg bg-gray-900 border-2 border-gray-600 text-white focus:outline-none focus:border-yellow-500 transition mb-4"
                            />
                            <label className="flex items-center space-x-2 mb-4">
                                <input
                                    type="checkbox"
                                    checked={selectedTodo.completed}
                                    onChange={() =>
                                        setSelectedTodo({ ...selectedTodo, completed: !selectedTodo.completed })
                                    }
                                    className="w-5 h-5 text-yellow-500 focus:ring-yellow-500 border-gray-600 rounded"
                                />
                                <span className="text-gray-300">Mark as Completed</span>
                            </label>

                            <div className="flex justify-between gap-2">
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}