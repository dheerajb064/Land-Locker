import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


export default function BasicTable(props) {
    const sellerData = props.sellerData;
    console.log(sellerData)
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Account Address</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Aadhar Number</TableCell>
                        <TableCell align="right">Pan Number</TableCell>
                        <TableCell align="right">Owned Lands</TableCell>
                        <TableCell align="right">Aadhar Card Document</TableCell>
                        <TableCell align="right">Verification Status</TableCell>
                        <TableCell align="right">Verify Seller</TableCell>
                        <TableCell align="right">Reject Seller</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellerData.map((ele) => (
                        <TableRow key={ele[6]}>
                            <TableCell component="th" scope="row">
                                {ele[6]}
                            </TableCell>
                            <TableCell align="right">{ele[7]}</TableCell>
                            <TableCell align="right">{ele[0]}</TableCell>
                            <TableCell align="right">{ele[1]}</TableCell>
                            <TableCell align="right">{ele[2]}</TableCell>
                            <TableCell align="right">{ele[3]}</TableCell>
                            <TableCell align="right">{ele[4]}</TableCell>
                            <TableCell align="right">{ele[5]}</TableCell>
                            <TableCell align="right">{ele[8]}</TableCell>
                            <TableCell align="right">{ele[9]}</TableCell>
                            <TableCell align="right">{ele[10]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}