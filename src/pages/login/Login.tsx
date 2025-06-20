import { Box, Grid, Paper, Typography } from "@mui/material";
import { Plane } from "lucide-react";
import "./login.css";
import useLoginStyles from "./useLoginStyles";
import paperStyle from "./paperLoginStyle";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  const clasess = useLoginStyles();

  return (
    <Grid container className={clasess.root}>
      <Grid
        container
        zIndex={2}
        sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <Paper elevation={10} sx={paperStyle}>
          <Grid container className={clasess.paperGrid}>
            <Box
              className={clasess.rowCenter}
              sx={{
                width: "100%",
                gap: 2,
              }}
            >
              <Plane size={46} />
              <Typography variant="h4" sx={{ letterSpacing: 1 }}>
                Sign In
              </Typography>
            </Box>
            <LoginForm />
          </Grid>
        </Paper>
      </Grid>
      <div className="layer"></div>
    </Grid>
  );
};

export default Login;
