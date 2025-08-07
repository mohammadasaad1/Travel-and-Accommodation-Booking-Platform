// pages/admin/AdminSearchBar.tsx
import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AdminSearchBar({
  value,
  onChange,
  onCreate,
  entity,
}: {
  value: string;
  onChange: (v: string) => void;
  onCreate: () => void;
  entity: string;
}) {
  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      <TextField
        size="small"
        label={`Search ${entity}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ flex: 1 }}
      />
      <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
        Create {entity.charAt(0).toUpperCase() + entity.slice(1)}
      </Button>
    </Box>
  );
}
