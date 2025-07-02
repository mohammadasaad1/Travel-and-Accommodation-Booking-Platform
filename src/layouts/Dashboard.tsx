import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import Typography from "@mui/material/Typography";

import SidebarFooter from "../ui/SideBarFooter";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Plane } from "lucide-react";
import Home from "../pages/home/Home";

function CustomAppTitle() {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      spacing={2}
      justifyContent="space-between"
      width={"100%"}
    >
      <Stack direction="row" alignItems={"center"} spacing={1}>
        <Plane size={40} />
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 500 }}
        >
          Gaza Go
        </Typography>
        <Chip size="small" label="BETA" color="primary" />
      </Stack>
    </Stack>
  );
}

export default function DashboardLayoutSlots({
  pathname,
  navigated,
}: {
  pathname: string;
  navigated: boolean;
}) {
  return (
    <DashboardLayout
      hideNavigation={navigated}
      slots={{
        appTitle: CustomAppTitle,
        sidebarFooter: SidebarFooter,
      }}
    >
      <Home />
    </DashboardLayout>
  );
}
