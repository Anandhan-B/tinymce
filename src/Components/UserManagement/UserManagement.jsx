import React,{useEffect, useState} from 'react'
import './UserManagement.css'
import { FcSearch } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import swal from "sweetalert2";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import SimpleLoader from "../SimpleLoader/SimpleLoader";
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


const UserManagement = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const filteredData = data.filter((row) => {
    const name = row.name.toLowerCase().includes(searchTerm.toLowerCase());
    const email = row.email.toLowerCase().includes(searchTerm.toLowerCase());
   
    return name || email ;
  });
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("bulkmailadmintoken");
      if (!token)
        return swal.fire("Error", "Session Expired, try again later", "error");
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:7000/api/v1/admin/alluser/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setData(response.data);
      } catch (error) {
        setLoading(false);
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

  const delUsr = async (id) => {
    const token = localStorage.getItem("bulkmailadmintoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    try {
      setDeleting(true);
      const response = await axios.delete(
        `http://localhost:7000/api/v1/admin/deleteuser/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setToggle((pre) => pre + 1);
      setDeleting(false);
      swal.fire({
        title: "Success",
        text: response.data,
        icon: "success",
      });
    } catch (error) {
      setDeleting(false);
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
  const deleteUser = async (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          delUsr(id);
        }
      });
  };
  const addUser = async () => {
    const { value: groupName } = await swal.fire({
      title: "Enter Email and Password",
      html: `
            <input placeholder="Enter Email" id="swal-input1" class="swal2-input">
            <input placeholder="Enter Password" id="swal-input2" class="swal2-input">
            
        `,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: async () => {
        const email = document.getElementById("swal-input1").value;
        const password = document.getElementById("swal-input2").value;
        if (!(email && password))
          return swal.fire("Error", "Input all fields", "error");
        await addUs(email, password);
      },
    });
  };

  const addUs = async (email, password) => {
    const token = localStorage.getItem("bulkmailadmintoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    try {
        setAdding(true)
        const response = await axios.post(
          "http://localhost:7000/api/v1/admin/newuser",
          {
            email,
            password
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setToggle((pre) => pre + 1);
        setAdding(false)
        swal.fire({
          title: "Success",
          text: response.data,
          icon: "success",
        });
      } catch (error) {
        setAdding(false)
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
  return (
    <>
      <div className="user-management-container">
        <h1 className="user-management-title">User Management</h1>

        <TableContainer component={Paper}>
          <Table size="small" sx={{ Width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableCell
                sx={{ paddingBottom: "0", paddingTop: "1rem" }}
                colSpan={6}
              >
                <div className="user-management-tools">
                  <div className="">
                    <span>
                      <FcSearch
                        style={{ fontSize: "20pt", padding: ".25rem" }}
                      />
                    </span>
                    <TextField
                      size="small"
                      label="Search"
                      variant="outlined"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ marginBottom: "1rem" }}
                    />
                  </div>
                  {adding ? <div className="add-group">
              <SimpleLoader /> Adding...
            </div>:
            <div onClick={addUser} className="add-task">
            <Button> Add User</Button>
          </div>}
                </div>
              </TableCell>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    {" "}
                    <SimpleLoader />{" "}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell> No User Here </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                </TableRow>
              ) : (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" sx={{ width: 10 }} scope="row">
                        {page * rowsPerPage + i + 1}
                      </TableCell>
                      <TableCell className="um-cell">
                        <span className="um-title">{row.name}</span>
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {deleting ? (
                          <SimpleLoader />
                        ) : (
                          <Button onClick={() => deleteUser(row._id)}>
                            <MdDeleteForever style={{color:'red',fontSize:'2rem'}}/>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              )}
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
  )
}

export default UserManagement