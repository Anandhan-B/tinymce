import React, { useEffect, useState } from "react";
import "./Tasks.css";
import { FcFolder } from "react-icons/fc";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import swal from "sweetalert2";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
  TextField,
  Button,
} from "@mui/material";

const Tasks = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupName, setGroupName] = useState("");
  const { id } = useParams();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("bulkmailusertoken");
      if (!token)
        return swal.fire("Error", "Session Expired, try again later", "error");
      try {
        const response = await axios.get(
          `http://localhost:7000/api/v1/user/taskgroup/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.tasks);
        setGroupName(response.data.groupName);
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
    };
    fetchData();
  }, [toggle]);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const addTask = async (name, file) => {
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    const emails = [];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const rows = content.split("\n");
      rows.forEach((row) => {
        const rowData = row.split(",");
        rowData.map((data) => {
          if (validateEmail(data)) emails.push(data);
        });
      });

      if (emails.length === 0)
        return swal.fire("Not Found", "No Emails found in the file", "info");
      try {
        const response = await axios.post(
          "http://localhost:7000/api/v1/user/task",
          {
            groupName,
            name,
            emails,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setToggle((pre) => pre + 1);
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
    reader.readAsText(file);
  };
  const addTasks = async () => {
    const { value: groupName } = await swal.fire({
      title: "Enter Task Name and Upload CSV to import Emails",
      html: `
            <input placeholder="Enter Task Name" id="swal-input1" class="swal2-input">
            <input type="file" accept=".csv" id="swal-input2"  class="swal2-file">
        `,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: async () => {
        const name = document.getElementById("swal-input1").value;
        const file = document.getElementById("swal-input2").files[0];
        if (!(name && file))
          return swal.fire("Error", "Input all fields", "error");
        await addTask(name, file);
      },
    });
  };

  return (
    <>
      <div className="tasks-container">
        <h1 className="tasks-title">{groupName} Tasks</h1>
        <div className="tasks-tools">
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <div onClick={addTasks} className="add-task">
            <MdOutlineCreateNewFolder size={30} /> Add Task
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Emails</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" sx={{ width: 10 }} scope="row">
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell className="task-cell">
                      <span className="task-title">{row.name}</span>
                    </TableCell>
                    <TableCell>{row.emails.join(",  ")}</TableCell>
                    <TableCell>
                      <Link
                        to="/dashboard"
                        state={row.emails}
                      >
                        <Button>Send Mail</Button>
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
      </div>
    </>
  );
};

export default Tasks;
