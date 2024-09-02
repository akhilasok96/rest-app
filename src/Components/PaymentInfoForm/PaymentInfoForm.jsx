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
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const PaymentInfoForm = () => {
  const initialValues = {
    paymentMode: "Stripe Checkout Option",
    storeId: "",
    checkoutId: "",
    apiToken: "",
    providerUrl: "",
    appId: "",
    hppKey: "",
    stripePublicKey: "",
    stripeSecretKey: "",
    showAppId: false,
  };

  const validationSchema = Yup.object().shape({
    paymentMode: Yup.string().required("Payment Mode is required"),
    storeId: Yup.number()
      .typeError("Store ID must be a number")
      .required("Store ID is required"),
    checkoutId: Yup.number()
      .typeError("Checkout ID must be a number")
      .required("Checkout ID is required"),
    apiToken: Yup.string().required("API Token is required"),
    providerUrl: Yup.string().required("Provider URL is required"),
    appId: Yup.string()
      .matches(/^\d*$/, "APP ID must be a number")
      .when("showAppId", {
        is: true,
        then: (schema) => schema.required("APP ID is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    stripePublicKey: Yup.string().required("Stripe Public Key is required"),
    stripeSecretKey: Yup.string().required("Stripe Secret Key is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <Paper elevation={5} sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: "1.5rem" }} gutterBottom>
        Payment Details
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='payment-mode-select-label'>
                    Select Payment Mode
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId='payment-mode-select-label'
                    id='payment-mode-select'
                    name='paymentMode'
                    label='Select Payment Mode'
                    value={values.paymentMode}
                    onChange={handleChange}
                  >
                    <MenuItem value='Stripe Checkout Option'>
                      Stripe Checkout Option
                    </MenuItem>
                    <MenuItem value='Moneris Hosted Page'>
                      Moneris Hosted Page
                    </MenuItem>
                    <MenuItem value='Moneris Checkout'>
                      Moneris Checkout
                    </MenuItem>
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label='Store ID'
                  name='storeId'
                  type='number'
                  variant='outlined'
                  fullWidth
                  error={touched.storeId && Boolean(errors.storeId)}
                  helperText={touched.storeId && errors.storeId}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label='Checkout ID'
                  name='checkoutId'
                  type='number'
                  variant='outlined'
                  fullWidth
                  error={touched.checkoutId && Boolean(errors.checkoutId)}
                  helperText={touched.checkoutId && errors.checkoutId}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='API Token'
                  name='apiToken'
                  variant='outlined'
                  fullWidth
                  error={touched.apiToken && Boolean(errors.apiToken)}
                  helperText={touched.apiToken && errors.apiToken}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Provider URL'
                  name='providerUrl'
                  variant='outlined'
                  fullWidth
                  error={touched.providerUrl && Boolean(errors.providerUrl)}
                  helperText={touched.providerUrl && errors.providerUrl}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.showAppId}
                      onChange={(event) => {
                        setFieldValue("showAppId", event.target.checked);
                        if (!event.target.checked) {
                          setFieldValue("appId", "");
                        }
                      }}
                      name='showAppId'
                    />
                  }
                  label='Include APP ID'
                />
              </Grid>

              {values.showAppId && (
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label='APP ID'
                    name='appId'
                    type='text'
                    variant='outlined'
                    fullWidth
                    error={touched.appId && Boolean(errors.appId)}
                    helperText={touched.appId && errors.appId}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='HPP Key'
                  name='hppKey'
                  variant='outlined'
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Stripe Public Key'
                  name='stripePublicKey'
                  variant='outlined'
                  fullWidth
                  error={
                    touched.stripePublicKey && Boolean(errors.stripePublicKey)
                  }
                  helperText={touched.stripePublicKey && errors.stripePublicKey}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='Stripe Secret Key'
                  name='stripeSecretKey'
                  type='password'
                  variant='outlined'
                  fullWidth
                  error={
                    touched.stripeSecretKey && Boolean(errors.stripeSecretKey)
                  }
                  helperText={touched.stripeSecretKey && errors.stripeSecretKey}
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

export default PaymentInfoForm;
