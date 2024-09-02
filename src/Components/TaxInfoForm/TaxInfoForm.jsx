import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const TaxInfoForm = () => {
  const initialValues = {
    gstNumber: "",
    pstNumber: "",
    taxApplicable: false,
    applicableTax: "",
  };

  const validationSchema = Yup.object().shape({
    gstNumber: Yup.number()
      .typeError("GST Number must be a number")
      .required("GST Number is required"),
    pstNumber: Yup.number()
      .typeError("PST Number must be a number")
      .required("PST Number is required"),
    applicableTax: Yup.string().when("taxApplicable", {
      is: true,
      then: (schema) =>
        schema.required("Applicable Tax is required when tax is applicable"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleSubmit = (values) => {
    // Submit form values
    console.log("Form Submitted:", values);
  };

  return (
    <Paper elevation={5} sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant='h6' gutterBottom>
        Tax Details
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='GST Number'
                  name='gstNumber'
                  type='number'
                  variant='outlined'
                  fullWidth
                  error={touched.gstNumber && Boolean(errors.gstNumber)}
                  helperText={touched.gstNumber && errors.gstNumber}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label='PST Number'
                  name='pstNumber'
                  type='number'
                  variant='outlined'
                  fullWidth
                  error={touched.pstNumber && Boolean(errors.pstNumber)}
                  helperText={touched.pstNumber && errors.pstNumber}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='taxApplicable'
                      checked={values.taxApplicable}
                      onChange={(event) => {
                        setFieldValue("taxApplicable", event.target.checked);
                        if (!event.target.checked) {
                          setFieldValue("applicableTax", "");
                        }
                      }}
                    />
                  }
                  label='Tax Applicable'
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={touched.applicableTax && Boolean(errors.applicableTax)}
                >
                  <InputLabel id='applicable-tax-label'>
                    Applicable Tax
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId='applicable-tax-label'
                    id='applicable-tax'
                    name='applicableTax'
                    label='Applicable Tax'
                    value={values.applicableTax}
                    onChange={handleChange}
                    disabled={!values.taxApplicable}
                  >
                    <MenuItem value='AB TAX'>AB TAX</MenuItem>
                    <MenuItem value='SK PST+GST'>SK PST+GST</MenuItem>
                  </Field>
                  {touched.applicableTax && errors.applicableTax && (
                    <Typography variant='caption' color='error'>
                      {errors.applicableTax}
                    </Typography>
                  )}
                </FormControl>
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

export default TaxInfoForm;
