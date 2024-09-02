import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const RestProfileForm = () => {
  const [country, setCountry] = useState("");

  const initialValues = {
    restaurantName: "",
    tabTitle: "",
    description: "",
    tags: "",
    country: "",
    contactNumber1: "",
    contactNumber2: "",
    storeEmail: "",
    notificationEmail: "",
    storeAddress: "",
    preparationTimeTakeout: "",
    preparationTimeDelivery: "",
    orderResponseTime: "",
    deliveryTeamID: "",
    isFranchiseEnabled: false,
    notifyIfOrderDelayed: false,
  };

  const validationSchema = Yup.object({
    restaurantName: Yup.string().required("Restaurant Name is required"),
    tabTitle: Yup.string().required("Tab Title is required"),
    description: Yup.string().required("Description is required"),
    tags: Yup.string().required("Tags are required"),
    country: Yup.string().required("Country is required"),
    contactNumber1: Yup.string()
      .matches(/^\d{10}$/, "Must be a valid phone number")
      .required("Contact Number 1 is required"),
    contactNumber2: Yup.string().matches(
      /^\d{10}$/,
      "Must be a valid phone number"
    ),
    storeEmail: Yup.string()
      .email("Invalid email format")
      .required("Store Email is required"),
    notificationEmail: Yup.string()
      .email("Invalid email format")
      .required("Notification Email is required"),
    storeAddress: Yup.string().required("Store Address is required"),
    preparationTimeTakeout: Yup.number()
      .min(20, "Min time is 20 minutes")
      .max(40, "Max time is 40 minutes")
      .required("Preparation Time for Takeout is required"),
    preparationTimeDelivery: Yup.number()
      .min(45, "Min time is 45 minutes")
      .max(50, "Max time is 50 minutes")
      .required("Preparation Time for Delivery is required"),
    orderResponseTime: Yup.number().required("Order Response Time is required"),
    deliveryTeamID: Yup.string().required("Delivery Team ID is required"),
  });

  const handleSubmit = (values) => {
    // Submit form values
    console.log("Form Submitted:", values);
  };

  return (
    <Paper elevation={5} sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant='h6' gutterBottom>
        Upload Images
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, getFieldProps, values, handleChange }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button
                  variant='contained'
                  component='label'
                  fullWidth
                  sx={{ fontWeight: "600" }}
                >
                  Upload Restaurant Logo
                  <input hidden accept='image/*' multiple type='file' />
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant='contained'
                  component='label'
                  fullWidth
                  sx={{ fontWeight: "600" }}
                >
                  Upload Banner Image
                  <input hidden accept='image/*' multiple type='file' />
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant='contained'
                  component='label'
                  fullWidth
                  sx={{ fontWeight: "600" }}
                >
                  Upload Default Dish Image
                  <input hidden accept='image/*' multiple type='file' />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Restaurant Name'
                  variant='outlined'
                  fullWidth
                  {...getFieldProps("restaurantName")}
                  error={
                    touched.restaurantName && Boolean(errors.restaurantName)
                  }
                  helperText={touched.restaurantName && errors.restaurantName}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      checked={values.isFranchiseEnabled}
                      {...getFieldProps("isFranchiseEnabled")}
                    />
                  }
                  label='Is Multiple Franchise Enabled'
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Tab Title to be displayed'
                  variant='outlined'
                  fullWidth
                  {...getFieldProps("tabTitle")}
                  error={touched.tabTitle && Boolean(errors.tabTitle)}
                  helperText={touched.tabTitle && errors.tabTitle}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Description'
                  variant='outlined'
                  multiline
                  rows={4}
                  fullWidth
                  {...getFieldProps("description")}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Tags'
                  variant='outlined'
                  fullWidth
                  {...getFieldProps("tags")}
                  error={touched.tags && Boolean(errors.tags)}
                  helperText={touched.tags && errors.tags}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={touched.country && Boolean(errors.country)}
                >
                  <InputLabel id='country-select-label'>Country</InputLabel>
                  <Select
                    labelId='country-select-label'
                    id='country-select'
                    value={values.country}
                    {...getFieldProps("country")}
                    onChange={(event) => {
                      handleChange(event);
                      setCountry(event.target.value);
                    }}
                    label='Country'
                  >
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Canada'>Canada</MenuItem>
                  </Select>
                  {touched.country && errors.country && (
                    <Typography variant='caption' color='error'>
                      {errors.country}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label='Contact Number 1'
                  variant='outlined'
                  fullWidth
                  type='tel'
                  {...getFieldProps("contactNumber1")}
                  error={
                    touched.contactNumber1 && Boolean(errors.contactNumber1)
                  }
                  helperText={touched.contactNumber1 && errors.contactNumber1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label='Contact Number 2'
                  variant='outlined'
                  fullWidth
                  type='tel'
                  {...getFieldProps("contactNumber2")}
                  error={
                    touched.contactNumber2 && Boolean(errors.contactNumber2)
                  }
                  helperText={touched.contactNumber2 && errors.contactNumber2}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Store Email'
                  variant='outlined'
                  fullWidth
                  {...getFieldProps("storeEmail")}
                  error={touched.storeEmail && Boolean(errors.storeEmail)}
                  helperText={touched.storeEmail && errors.storeEmail}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Notification Email'
                  variant='outlined'
                  fullWidth
                  {...getFieldProps("notificationEmail")}
                  error={
                    touched.notificationEmail &&
                    Boolean(errors.notificationEmail)
                  }
                  helperText={
                    touched.notificationEmail && errors.notificationEmail
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Store Address'
                  variant='outlined'
                  fullWidth
                  {...getFieldProps("storeAddress")}
                  error={touched.storeAddress && Boolean(errors.storeAddress)}
                  helperText={touched.storeAddress && errors.storeAddress}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label='Average Preparation Time for Takeout (min)'
                  variant='outlined'
                  fullWidth
                  type='number'
                  {...getFieldProps("preparationTimeTakeout")}
                  error={
                    touched.preparationTimeTakeout &&
                    Boolean(errors.preparationTimeTakeout)
                  }
                  helperText={
                    touched.preparationTimeTakeout &&
                    errors.preparationTimeTakeout
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label='Average Preparation Time for Delivery (min)'
                  variant='outlined'
                  fullWidth
                  type='number'
                  {...getFieldProps("preparationTimeDelivery")}
                  error={
                    touched.preparationTimeDelivery &&
                    Boolean(errors.preparationTimeDelivery)
                  }
                  helperText={
                    touched.preparationTimeDelivery &&
                    errors.preparationTimeDelivery
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Order Response Time (min)'
                  variant='outlined'
                  fullWidth
                  type='number'
                  {...getFieldProps("orderResponseTime")}
                  error={
                    touched.orderResponseTime &&
                    Boolean(errors.orderResponseTime)
                  }
                  helperText={
                    touched.orderResponseTime && errors.orderResponseTime
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      checked={values.notifyIfOrderDelayed}
                      {...getFieldProps("notifyIfOrderDelayed")}
                    />
                  }
                  label='Notify if order delayed to accept'
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Delivery Team ID'
                  variant='outlined'
                  fullWidth
                  {...getFieldProps("deliveryTeamID")}
                  error={
                    touched.deliveryTeamID && Boolean(errors.deliveryTeamID)
                  }
                  helperText={touched.deliveryTeamID && errors.deliveryTeamID}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type='submit' variant='contained' color='primary'>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default RestProfileForm;
