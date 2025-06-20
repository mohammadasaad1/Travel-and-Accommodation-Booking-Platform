import { makeStyles, createStyles } from "@mui/styles";
const useLoginStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "100vh",
      backgroundImage: 'url("/italyBackground.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    wrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      zIndex: 2,
    },
    paperGrid: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    rowCenter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    form: {
      width: "100%",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    formBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2.5em",
    },
  })
);

export default useLoginStyles;
