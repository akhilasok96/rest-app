import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";

const ExtraPayment = () => {
  const [extraPayments, setExtraPayments] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    extraPaymentPercent: Yup.number()
      .required("Extra Payment is required")
      .typeError("Extra Payment must be a number"),
    enableDelivery: Yup.boolean(),
    enableTakeout: Yup.boolean(),
    enableDiscount: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      enableDelivery: false,
      enableTakeout: false,
      enableDiscount: false,
      extraPaymentPercent: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (currentPayment !== null) {
        setExtraPayments((prevPayments) =>
          prevPayments.map((payment, index) =>
            index === currentPayment ? values : payment
          )
        );
      } else {
        setExtraPayments((prevPayments) => [...prevPayments, values]);
      }
      setFormOpen(false);
      formik.resetForm();
    },
  });

  const handleOpenForm = () => {
    setFormOpen(true);
    setCurrentPayment(null);
    formik.resetForm();
  };

  const handleEditPayment = (index) => {
    setCurrentPayment(index);
    formik.setValues(extraPayments[index]);
    setFormOpen(true);
  };

  const handleCancel = () => {
    setFormOpen(false);
    setCurrentPayment(null);
    formik.resetForm();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: "600" }}>
          Extra Payment List
        </Typography>
        <Button
          variant='contained'
          sx={{
            backgroundColor: "#388e3c",
            fontSize: "0.8rem",
            fontWeight: "600",
          }}
          onClick={handleOpenForm}
          startIcon={<AddIcon />}
        >
          New Extra Payment
        </Button>
      </Box>

      {formOpen && (
        <Box
          component='form'
          sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label='Title'
            name='title'
            placeholder='Enter Category Name'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.enableDelivery}
                    onChange={formik.handleChange}
                    name='enableDelivery'
                  />
                }
                label='Enable for Delivery Orders'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.enableTakeout}
                    onChange={formik.handleChange}
                    name='enableTakeout'
                  />
                }
                label='Enable for Takeout Orders'
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.enableDiscount}
                onChange={formik.handleChange}
                name='enableDiscount'
              />
            }
            label='Enabled Discount in Percentage'
          />
          <TextField
            label={`Extra Payment (${
              formik.values.enableDiscount ? "%" : "$"
            })`}
            name='extraPaymentPercent'
            placeholder={`Enter Value (${
              formik.values.enableDiscount ? "%" : "$"
            })`}
            value={formik.values.extraPaymentPercent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.extraPaymentPercent &&
              Boolean(formik.errors.extraPaymentPercent)
            }
            helperText={
              formik.touched.extraPaymentPercent &&
              formik.errors.extraPaymentPercent
            }
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant='outlined' color='secondary' onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={
                !(formik.values.enableDelivery || formik.values.enableTakeout)
              }
            >
              {currentPayment !== null ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      )}

      <Grid container spacing={3}>
        {extraPayments.map((payment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 2,
                background: "linear-gradient(to right, #4a148c, #7b1fa2)",
                color: "#fff",
                borderRadius: 2,
              }}
            >
              <Typography variant='h6' sx={{ fontWeight: "700", mb: 1 }}>
                {payment.title}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontWeight: "500", fontSize: "1rem" }}
              >
                Enable Delivery: {payment.enableDelivery ? "Yes" : "No"}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontWeight: "500", fontSize: "1rem" }}
              >
                Enable Takeout: {payment.enableTakeout ? "Yes" : "No"}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontWeight: "500", fontSize: "1rem" }}
              >
                Enable Discount: {payment.enableDiscount ? "Yes" : "No"}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontWeight: "500", fontSize: "1rem" }}
              >
                Extra Payment:{" "}
                {payment.enableDiscount
                  ? `${payment.extraPaymentPercent}%`
                  : `$${payment.extraPaymentPercent}`}
              </Typography>
              <Button
                variant='contained'
                sx={{
                  mt: 2,
                  fontWeight: "600",
                  borderRadius: "1.2rem",
                  backgroundColor: "#ffffff",
                  color: "#4a148c",
                  "&:hover": {
                    backgroundColor: "#f3e5f5",
                  },
                }}
                onClick={() => handleEditPayment(index)}
              >
                Update
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExtraPayment;
