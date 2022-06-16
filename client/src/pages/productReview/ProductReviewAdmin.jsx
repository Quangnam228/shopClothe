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

export default function ProductReviewAdmin() {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState();

  let { productReview } = useSelector((state) => state.productReviewAdmin);

  const handleDelete = (id) => {
    deleteReview(id, productId, dispatch);
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    getAllProductReview(productId, dispatch);
  };

  useEffect(() => {
    if (productId?.length === 24) {
      getAllProductReview(productId, dispatch);
    }
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
              onClick={() => handleDelete(params.row._id)}
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
          </>
        ) : (
          <h1 className="productReviewsFormHeading">No Review Found</h1>
        )}
      </div>
    </>
  );
}
