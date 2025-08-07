// AdminSidebar.tsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

const NAV = [
  { key: "cities", icon: <LocationCityIcon />, label: "Cities" },
  { key: "hotels", icon: <HotelIcon />, label: "Hotels" },
  { key: "rooms", icon: <MeetingRoomIcon />, label: "Rooms" },
];

export default function AdminSidebar({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (tab: string) => void;
}) {
  return (
    <Drawer variant="permanent" PaperProps={{ sx: { width: 200 } }}>
      <List>
        {NAV.map(({ key, icon, label }) => (
          <ListItemButton
            key={key}
            selected={tab === key}
            onClick={() => setTab(key)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
