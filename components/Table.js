import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DenseTable({name, ranking}) {

  var x = 0;
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 150 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((team) => (
            <TableRow>
              <TableCell>{x += 1}. {team}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}