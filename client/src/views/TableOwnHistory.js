import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


export default function BasicTable(props) {
    const landData = props.data;
    console.log(landData)
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Area</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">State</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Property ID</TableCell>
                        <TableCell align="right">Survey Number</TableCell>
                        <TableCell align="right">Reciept</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {console.log(landData.length)}
                    {landData.map((ele) => (
                        <TableRow key={ele[0]}>
                            <TableCell component="th" scope="row">
                                {ele[0]}
                            </TableCell>
                            <TableCell align="right">{ele[1]}</TableCell>
                            <TableCell align="right">{ele[2]}</TableCell>
                            <TableCell align="right">{ele[3]}</TableCell>
                            <TableCell align="right">{ele[4]}</TableCell>
                            <TableCell align="right">{ele[5]}</TableCell>
                            <TableCell align="right">{ele[6]}</TableCell>
                            <TableCell align="right">{ele[7]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}