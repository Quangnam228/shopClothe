import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import "./productReview.css";
import {
  getAllProductReview,
  deleteReview,
  getResetReview,
} from "../../redux/apiCallsAdmin";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function ProductReviewAdmin() {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => setOpen(false);

  let { productReview } = useSelector((state) => state.productReviewAdmin);

  const handleDelete = (id) => {
    setOpen(false);
    deleteReview(id, productId, dispatch);
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    getAllProductReview(productId, dispatch);
  };

  useEffect(() => {
    // if (productId?.length === 24) {
    //   getAllProductReview(productId, dispatch);
    // }
    getResetReview(dispatch);
  }, [dispatch, productId]);

  const columns = [
    { field: "_id", headerName: "Review ID", minWidth: 180, flex: 0.4 },

    {
      field: "name",
      headerName: "User",
      minWidth: 140,
      flex: 0.3,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 300,
      flex: 0.6,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 110,
      flex: 0.2,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 120,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <DeleteIcon
              className="productListDelete"
              onClick={() => handleOpen(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productReviewsContainer">
        <from className="productReviewsForm">
          <h1 className="productReviewsRFormHeading">All Reviews</h1>

          <div>
            <Star />
            <input
              type="text"
              placeholder="Product Id"
              required
              onChange={(e) => setProductId(e.target.value)}
            />
            <button
              onClick={productReviewsSubmitHandler}
              className="createProductReviewBtn"
            >
              Search
            </button>
          </div>
        </from>

        {productReview && productReview.length > 0 ? (
          <>
            <DataGrid
              rows={productReview}
              columns={columns}
              pageSize={8}
              getRowId={(row) => row._id}
              disableSelectionOnClick
              autoHeight
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
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h6"
                      >
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
          </>
        ) : (
          <h1 className="productReviewsFormHeading">No Review Found</h1>
        )}
      </div>
    </>
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
