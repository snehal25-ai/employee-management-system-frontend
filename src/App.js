import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const addEmployee = async () => {
    try {
      const response = await axios.post("/api/employees", { name, role });
      setEmployees([...employees, response.data]);
      setName("");
      setRole("");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h1 className="header">Employee Management System</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addEmployee();
        }}
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Add Employee</button>
      </form>
      <ul className="employee-list">
        {employees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <span className="employee-name">{employee.name}</span>
            <span className="employee-role">{employee.role}</span>
            <button
              onClick={() => deleteEmployee(employee.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
