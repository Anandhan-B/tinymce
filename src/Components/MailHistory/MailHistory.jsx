import React, { useEffect, useState } from "react";
import "./MailHistory.css";
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

const MailHistory = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const filteredData = data.filter((row) => {
    const window = row.window.toLowerCase().includes(searchTerm.toLowerCase());
    const action = row.action.toLowerCase().includes(searchTerm.toLowerCase());
    const status = row.status.toLowerCase().includes(searchTerm.toLowerCase());
    const time = row.time.toLowerCase().includes(searchTerm.toLowerCase());
    return window || action || status || time;
  });
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("bulkmailusertoken");
      if (!token)
        return swal.fire("Error", "Session Expired, try again later", "error");
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:7000/api/v1/user/history/`,
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

  const delHis = async (id) => {
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    try {
      setDeleting(true);
      const response = await axios.delete(
        `http://localhost:7000/api/v1/user/history/${id}`,
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
  const deleteHistory = async (id) => {
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
          delHis(id);
        }
      });
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${ampm}`;

    return `Date:${formattedDate}\nTime:${formattedTime}`;
  };
  return (
    <>
      <div className="history-container">
        <h1 className="history-title">Usage History</h1>

        <TableContainer component={Paper}>
          <Table size="small" sx={{ Width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableCell
                sx={{ paddingBottom: "0", paddingTop: "1rem" }}
                colSpan={6}
              >
                <div className="history-tools">
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
                </div>
              </TableCell>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Window</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
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
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell> No History Here </TableCell>
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
                      <TableCell className="his-cell">
                        <span className="his-title">{row.window}</span>
                      </TableCell>
                      <TableCell>{row.action}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{formatTime(row.time)}</TableCell>
                      <TableCell>
                        {deleting ? (
                          <SimpleLoader />
                        ) : (
                          <Button onClick={() => deleteHistory(row._id)}>
                            <RiDeleteBin2Line style={{color:'red',fontSize:'2rem'}}/>
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
  );
};

export default MailHistory;
