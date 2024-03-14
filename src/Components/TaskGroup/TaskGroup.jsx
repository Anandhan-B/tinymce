import React from 'react'
import './TaskGroup.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { FcFolder } from "react-icons/fc";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const TaskGroup = () => {
  let data = [
    {"group-name":"one"},
    {"group-name":"two"},
    {"group-name":"three"},
    {"group-name":"four"},
    {"group-name":"five"},
    {"group-name":"six"},
  ]
  const columns = [
    { field: 's.no', headerName: 'S. No', width: 70 },
    { field: 'group-name', headerName: 'Group Name', width: 130 },
  ]
  return (
    <>
      <div className='taskgroup-container'>
        <h1 className='taskgroup-title'>Task Groups</h1>
        <div className="add-group">
          < MdOutlineCreateNewFolder size={30} /> Add Task Group
        </div>

        <div className="taskgroup-list">
          <div className="taskgroup">
            <div className="folder-icon">
              <FcFolder size={30}/>
            </div>
            <div className="group-name">
              Group 1
            </div>
          </div>
          <div className="taskgroup">
            <div className="folder-icon">
              <FcFolder size={30}/>
            </div>
            <div className="group-name">
              Group 2
            </div>
          </div>
          <div className="taskgroup">
            <div className="folder-icon">
              <FcFolder size={30}/>
            </div>
            <div className="group-name">
              Group 3
            </div>
          </div>
          <div className="taskgroup">
            <div className="folder-icon">
              <FcFolder size={30}/>
            </div>
            <div className="group-name">
              Group 4
            </div>
          </div>
          <div className="taskgroup">
            <div className="folder-icon">
              <FcFolder size={30}/>
            </div>
            <div className="group-name">
              Group 5
            </div>
          </div>
        </div>
        {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S. No</TableCell>
            <TableCell align="right">Group Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row["group-name"]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">{row["group-name"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
      </div>

    </>
  )
}

export default TaskGroup