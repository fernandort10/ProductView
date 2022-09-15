import React, { useState } from "react";
import "./Homepage.css";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/Paper";

import Footer from "../Footer/Footer";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const alertMessage = () => {
    alert("Coming Soon!");
  };

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="table-container">
        <h1>List of Products</h1>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            className="table"
            sx={{ maxHeight: 440, textAlign: "center" }}
          >
            <Table stickyHeader aria-label="sticky table" sx={{}}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "0%",
                      backgroundColor: "primary",
                      fontSize: "large",
                    }}
                    align="center"
                  >
                    No.
                  </TableCell>
                  <TableCell
                    sx={{ width: "0%", fontSize: "large" }}
                    align="center"
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    sx={{ width: "0%", fontSize: "large" }}
                    align="center"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{ width: "0%", fontSize: "large" }}
                    align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return (
                      <TableRow hover role="checkbox">
                        <TableCell
                          sx={{ fontSize: "large", color: "white" }}
                          align="center"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "large", color: "white" }}
                          align="center"
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "large", color: "white" }}
                          align="center"
                        >
                          ${item.price}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "large", color: "white" }}
                          align="center"
                        >
                          <button
                            className="order-button"
                            onClick={() => alertMessage()}
                          >
                            Order Now
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <Footer />
    </div>
  );
}
