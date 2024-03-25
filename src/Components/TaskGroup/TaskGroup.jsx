import React, { useEffect, useState } from "react";
import "./TaskGroup.css";
import { FcFolder } from "react-icons/fc";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import swal from "sweetalert2";
import axios from "axios";
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter, TextField } from '@mui/material';
const TaskGroup = () => {
  const [data, setData] = useState([])
  const [toggle, setToggle] = useState(1)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const filteredData = data.filter(row =>
    row.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchData = async()=>{
      const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    try {
      const response = await axios.get(
        "http://localhost:7000/api/v1/user/taskgroup",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      if (error.response.status) {
        swal.fire({
          title: error.response.statusText,
          text: error.response.data,
          icon: "error",
        });
      } else {
        swal.fire({ title: "Error", text: error.message, icon: "error" });
      }
    }
    }
    fetchData()
  }, [toggle] );

  const addTaskGroup = async (value) => {
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");

    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/taskgroup",
        {
          name: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToggle(pre => pre+1)
      swal.fire({
        title: "Success",
        text: response.data,
        icon: "success",
      });
    } catch (error) {
      if (error.response && error.response.status) {
        swal.fire({
          title: error.response.statusText,
          text: error.response.data,
          icon: "error",
        });
      } else {
        swal.fire({ title: "Error", text: error.message, icon: "error" });
      }
    }
  };
  const addgroup = async () => {
    const { value: groupName } = await swal.fire({
      title: "Enter Task Group Name",
      input: "text",
      inputLabel: "TaskGroup",
      showCancelButton: true,
      showConfirmButton: true,
      inputValidator: (value) => {
        return new Promise(async (resolve) => {
          if (!value) return resolve("Name cannot be empty");
          addTaskGroup(value);
          resolve();
        });
      },
    });
  };
  
  return (
    <>
      <div className="taskgroup-container">
        <h1 className="taskgroup-title">Task Groups</h1>
        <div onClick={addgroup} className="add-group">
          <MdOutlineCreateNewFolder size={30} /> Add Task Group
        </div>
        <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" sx={{width:10}} scope="row">
                  {page * rowsPerPage + i + 1}
                </TableCell>
                <TableCell className="group-cell">
                <Link to={row._id}>
                  <FcFolder className="fc-group-icon" size={30} />
                  <span className="group-title">{row.groupName}</span>
                  <small>{row.tasks.length} Tasks</small>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="td"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
           </Table>
      </TableContainer>
      {/* <div className="taskgroup-list">
          {data.map(d=>{
              <div className="taskgroup">
              <div className="folder-icon">
                <FcFolder size={30} />
              </div>
              <div className="group-name">{d.groupName}</div>
            </div>
          })}
          
        </div> */}
      </div>
    </>
  );
};

export default TaskGroup;
