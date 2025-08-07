import { Typography } from "@mui/material";

export default function sidebarFooter() {
  return (
    <Typography
      variant="caption"
      sx={{ whiteSpace: "nowrap", overflow: "hidden", ml: 0.5 }}
    >
      {`© ${new Date().getFullYear()} FTS`}
    </Typography>
  );
}
