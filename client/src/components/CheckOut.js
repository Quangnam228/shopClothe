import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function CheckOut({
  open,
  handleClose,
  handleChange,
  handleSubmit,
}) {
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <FormGroup sx={style} onSubmit={handleSubmit}>
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Buyer information
                </Typography>
                <TextField
                  sx={style1}
                  id="outlined-basic"
                  name="fullName"
                  required
                  // error
                  helperText="Username should be 3-16 characters "
                  label="Full Name"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  sx={style1}
                  id="outlined-basic"
                  label="Email"
                  name="email"
                  required
                  // error
                  helperText="It should be a valid email address!"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  sx={style1}
                  id="outlined-basic"
                  label="Mobile"
                  name="mobile"
                  required
                  // error
                  helperText="you can only enter numbers"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  sx={style1}
                  id="outlined-basic"
                  label="City"
                  name="city"
                  required
                  // error
                  helperText="Username should be 3-16 characters "
                  variant="outlined"
                  onChange={handleChange}
                />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  total: $ {cart.total}
                </Typography>
              </Grid>
            </Grid>
            <Stack spacing={2} direction="row" sx={style2}>
              <Button variant="outlined" type="submit" text="Submit">
                payment
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                cancel
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
const style1 = {
  padding: "5px",
  width: "100%",
};
const style2 = {
  display: "flex",
  justifyContent: "center",
};
