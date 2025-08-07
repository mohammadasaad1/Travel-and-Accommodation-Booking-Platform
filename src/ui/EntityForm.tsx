// EntityForm.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (fields: any) => void;
  initialData?: any;
  fields: { name: string; label: string; type?: string }[];
  title: string;
};
export default function EntityForm({
  open,
  onClose,
  onSave,
  initialData,
  fields,
  title,
}: Props) {
  const [form, setForm] = useState<any>({});
  useEffect(() => {
    setForm(initialData || {});
  }, [initialData, open]);
  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {fields.map((f) => (
            <TextField
              key={f.name}
              label={f.label}
              name={f.name}
              value={form[f.name] || ""}
              onChange={handleChange}
              type={f.type || "text"}
              fullWidth
              margin="dense"
              required
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
