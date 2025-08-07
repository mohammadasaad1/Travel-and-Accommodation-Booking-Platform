// pages/admin/CitiesGrid.tsx
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export function CitiesGrid({ data, onEdit, onDelete }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Country</TableCell>
          <TableCell>Post Office</TableCell>
          <TableCell>Hotels</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Modified</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((city: any) => (
          <TableRow key={city.id}>
            <TableCell>{city.name}</TableCell>
            <TableCell>{city.country}</TableCell>
            <TableCell>{city.postOffice}</TableCell>
            <TableCell>{city.hotelCount}</TableCell>
            <TableCell>{city.createdAt}</TableCell>
            <TableCell>{city.updatedAt}</TableCell>
            <TableCell align="right">
              <IconButton size="small" onClick={() => onEdit(city)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => onDelete(city.id)}>
                <DeleteIcon color="error" fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
