import React, { useContext, useState } from "react";
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
import { UserContext } from "../UserProvider/UserProvider";
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [adminValue, setAdminValue] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [productsData, setProductsData] = useState({
    name: "",
    price: "",
  });
  var { username, password } = useContext(UserContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const url = "http://127.0.0.1:8000/api/users";

  useEffect(() => {
    axios
      .get(`${url}/${username}/${password}`)
      .then((json) => {
        setAdminValue(json.data.isAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("");
  }, [username]);

  const getProducts = async () => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((json) => {
        setProducts(json.data);
        console.log(json.data);
      })
      .catch((err) => {});
  };

  console.log();

  const alertMessage = () => {
    alert("Coming Soon!");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setProductsData({
      ...productsData,
      [e.target.name]: value,
    });
  };

  console.log(productsData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: productsData.name,
      price: productsData.price,
    };

    axios
      .post("http://127.0.0.1:8000/api/products", userData)
      .then((response) => {
        console.log(response);
      });
    window.location.reload(false);
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    const userData = {
      name: productsData.name,
    };
    try {
      axios.delete(
        `http://127.0.0.1:8000/api/products${userData.name}`,
        userData
      );
      console.log("borrado exitosamente");
    } catch (err) {
      alert(err);
    }
    window.location.reload(false);
  };

  return (
    <div className="homepage-container">
      <Navbar />
      <div>
        {adminValue ? (
          <div className="table-container">
            <h1>Welcome {username}!</h1>
            <h5>List of Products</h5>
            <button onClick={handleOpen} className="add-product-button">
              Add Product
            </button>
            <button onClick={handleOpen2} className="delete-product-button">
              Delete Product
            </button>
            <button onClick={handleOpen} className="update-product-button">
              Update Product
            </button>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer className="table" sx={{ textAlign: "center" }}>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
        ) : !adminValue ? (
          <div className="table-container">
            <h1>Welcome {username}!</h1>
            <h5>List of Products</h5>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
        ) : (
          <h1>Error</h1>
        )}
      </div>

      <div className="modal">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="form-container">
              <h3>Create product!</h3>
              <form onSubmit={handleSubmit} className="update-product-form">
                <h4>Name:</h4>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  value={productsData.name}
                />
                <h4>Price:</h4>
                <input
                  onChange={handleChange}
                  type="text"
                  name="price"
                  value={productsData.price}
                />
                <div className="button-container">
                  <button type="submit" className="close-button">
                    Save
                  </button>
                  <button className="close-button" onClick={handleClose}>
                    close
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>

      <div className="modal">
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="form-container">
              <h3>Delete product!</h3>
              <form
                onSubmit={handleSubmitDelete}
                className="update-product-form"
              >
                <h4>Name:</h4>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  value={productsData.name}
                />
                <div className="button-container">
                  <button type="submit" className="close-button">
                    Save
                  </button>
                  <button className="close-button" onClick={handleClose2}>
                    close
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>

      <Footer />
    </div>
  );
}
