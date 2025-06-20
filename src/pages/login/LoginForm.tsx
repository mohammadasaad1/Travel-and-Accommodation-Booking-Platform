import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import { AccountCircle, Https as HttpsIcon } from "@mui/icons-material";
import GGButton from "../../ui/GGButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLoginStyles from "./useLoginStyles";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginForm: React.FC = () => {
  const classes = useLoginStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(8, "At least 8 chars")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const response = await login(values.username, values.password);
        const { token, userType } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userType", userType);
        toast.success("Login successful!");
        navigate("/home");
      } catch (error: any) {
        if (error.response?.status === 401) {
          setErrors({ password: "Invalid username or password" });
          toast.error("Invalid username or password");
        } else {
          toast.error("Invalid username or password");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <Box className={classes.formBox}>
        <TextField
          fullWidth
          id="input-with-icon-textfield"
          name="username"
          label="Username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle sx={{ color: "white" }} />{" "}
              </InputAdornment>
            ),
          }}
          variant="outlined"
          disabled={formik.isSubmitting}
        />

        <TextField
          fullWidth
          id="password"
          label="Password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HttpsIcon sx={{ color: "white" }} />{" "}
              </InputAdornment>
            ),
          }}
          variant="outlined"
          disabled={formik.isSubmitting}
        />
        <GGButton
          sx={{ width: "100%" }}
          htmlType="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Signing In..." : "Sign In"}
        </GGButton>
        <CircularProgress
          sx={{ display: `${formik.isSubmitting ? "bolck" : "none"}` }}
        />
      </Box>
    </form>
  );
};

export default LoginForm;
