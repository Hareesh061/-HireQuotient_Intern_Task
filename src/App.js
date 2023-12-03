import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Table, InputGroup, FormControl, Button,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleDeleteAll = () => {
      if (selectedRows.length > 0) {
          setUsers(users.filter(user => !selectedRows.includes(user.id)));
          setSelectedRows([]);
          setSelectAll(false);
      }
  };

    useEffect(() => {
        // Fetch the data 
        axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then(response => {
                // Set the data in the state
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle search
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        // Filter users based on the search term
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase()) ||
            user.role.toLowerCase().includes(term.toLowerCase())
        );

        // Update the users and reset the current page
        setUsers(filteredUsers);
        setCurrentPage(1);
    };

    // Handle row selection
    const handleRowSelect = (id) => {
        const updatedSelection = selectedRows.includes(id)
            ? selectedRows.filter(rowId => rowId !== id)
            : [...selectedRows, id];
        setSelectedRows(updatedSelection);
        setSelectAll(false);
    };

    const handleSelectAll = () => {
        if (selectAll) {
          setSelectedRows([]);
        } else {
          const allUserIds = currentUsers.map(user => user.id);
          setSelectedRows(allUserIds);
        }
        setSelectAll(!selectAll);
      };

      //Handle Edit
      const handleEdit = (user) => {
        const newData = { ...user };
        newData.name = window.prompt('Enter a new name:', user.name) || user.name;
        newData.email = window.prompt('Enter a new email:', user.email) || user.email;
        newData.role = window.prompt('Enter a new role:', user.role) || user.role;

        const updatedUsers = users.map(u => (u.id === user.id ? newData : u));
        setUsers(updatedUsers);
    };

    // Handle delete
    const handleDelete = (user) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);
        if (confirmDelete) {
           
            const updatedUsers = users.filter(u => u.id !== user.id);
            setUsers(updatedUsers);
        }
    };


    // UI construction 
    return (
      <div className="admin-dashboard">
        <div className="top-bar">
            <div className="search-bar">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="small-search-bar"
                    />
                </InputGroup>
            </div>
            <div className="delete-all-btn">
                <Button variant="danger" size="sm" onClick={handleDeleteAll}>Delete All</Button>
            </div>
        </div>
        <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr
              key={user.id}
              className={selectedRows.includes(user.id) ? 'selected-row' : ''}
              onClick={() => handleRowSelect(user.id)}
            >
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelect(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleEdit(user)}
              >
              <FaEdit />
              </Button>{' '}
              
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(user)}
              >
              <FaTrash />
              </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
          number => (
            <Button
              key={number + 1}
              variant="outline-dark"
              onClick={() => paginate(number + 1)}
              active={number + 1 === currentPage}
            >
              {number + 1}
            </Button>
          )
        )}
      </div>
      <div className="selected-count">
        {selectedRows.length > 0 && (
          <p>{`${selectedRows.length} row(s) selected to delete.`}</p>
        )}
      </div>
      <div className="current-page">
        <p>
          Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
        </p>
      </div>
    </div>
  );
};

export default App;