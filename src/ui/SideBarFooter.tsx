import { Typography } from "@mui/material";

export default function sidebarFooter() {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {`© ${new Date().getFullYear()} Made with love by Mohammad As'ad`}
    </Typography>
  );
}
