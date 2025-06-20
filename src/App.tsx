import React from "react";
import AppRouter from "./router";
import { ToastContainer } from "react-toastify";
import "./app.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
      <ToastContainer position="bottom-left" autoClose={3000} />
    </ThemeProvider>
  );
};

export default App;
