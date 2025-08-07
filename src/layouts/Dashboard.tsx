// layouts/DashboardLayoutSlots.tsx
import React from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import SidebarFooter from "../ui/SideBarFooter";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Plane } from "lucide-react";
import AdminSidebar from "../pages/admin/AdminSidebar";

// Application Title Bar
function CustomAppTitle() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      justifyContent="space-between"
      width="100%"
    >
      <Stack direction="row" alignItems="center" spacing={1}>
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

type DashboardLayoutSlotsProps = {
  pathname: string;
  navigated: boolean;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export default function DashboardLayoutSlots({
  pathname,
  navigated,
  children,
  sidebar,
}: DashboardLayoutSlotsProps) {
  return (
    <DashboardLayout
      hideNavigation={navigated}
      slots={{
        appTitle: CustomAppTitle,
        sidebar: sidebar,
        sidebarFooter: SidebarFooter,
      }}
      sx={{ minHeight: "100vh" }}
    >
      {children}
    </DashboardLayout>
  );
}
