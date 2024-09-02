import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../Features/authentication/authSlice";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  // const paperStyle = {
  //   padding: 20,
  //   height: 520,
  //   width: "30%",
  //   maxWidth: 420,
  //   margin: "20px auto",
  //   borderRadius: 15,
  // };

  const gridContainerStyle = {
    minHeight: "100vh",
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('/assets/1.webp')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const avatarStyle = { backgroundColor: "#00b900" };
  const buttonStyle = { margin: "8px 0" };
  const textFieldStyle = { margin: "8px 0" };

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const onSubmit = (values, props) => {
    // console.log(values);
    dispatch(loginRequest());
    setTimeout(() => {
      if (
        values.email === "test@example.com" &&
        values.password === "password"
      ) {
        dispatch(loginSuccess({ email: values.email }));
        navigate("/dashboard");
      } else {
        dispatch(loginFailure("Invalid email or password"));
      }
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <Grid
      container
      style={gridContainerStyle}
      justifyContent='center'
      alignItems='center'
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: { xs: "90%", sm: "80%", md: "50%", lg: "35%" }, // Responsive width
          maxWidth: 420, // Maximum width to prevent it from becoming too wide
          margin: "20px auto",
          borderRadius: 2,
        }}
      >
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                id='email'
                name='email'
                label='Email'
                placeholder='Enter Email'
                variant='outlined'
                fullWidth
                required
                style={textFieldStyle}
                helperText={<ErrorMessage name='email' />}
              />
              <Field
                as={TextField}
                id='password'
                name='password'
                label='Password'
                placeholder='Enter Password'
                variant='outlined'
                fullWidth
                type='password'
                required
                style={textFieldStyle}
                helperText={<ErrorMessage name='password' />}
              />
              <Field
                as={FormControlLabel}
                name='remember'
                control={<Checkbox />}
                label='Remember Me'
                sx={{ marginTop: "0.5rem" }}
              />
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={buttonStyle}
                fullWidth
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Logging In" : "Login"}
              </Button>
              {authState.error && (
                <Typography color='error'>{authState.error}</Typography>
              )}
            </Form>
          )}
        </Formik>
        <Typography sx={{ marginTop: "0.8rem" }}>
          <Link href='#'>Forgot Password ?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
