import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCallsAdmin";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function ProductListAdmin() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productAdmin.products);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    setOpen(false);
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    // { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={"" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleOpen(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/admin/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      <Modal open={open} onClose={handleClose}>
        <FormGroup sx={style}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "55ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container>
              <Grid item xs={8}>
                <Typography id="modal-modal-title" variant="h6" component="h6">
                  Are you sure you want to delete?
                </Typography>
              </Grid>
            </Grid>
            <Stack spacing={2} direction="row" sx={style2}>
              <Button variant="outlined" onClick={() => handleDelete(id)}>
                Yes
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                No
              </Button>
            </Stack>
          </Box>
        </FormGroup>
      </Modal>
    </div>
  );
}

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

const style2 = {
  display: "flex",
  justifyContent: "center",
};
