// AdminPage.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  CircularProgress,
  Tooltip,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminSidebar from "./AdminSidebar";
import DashboardLayoutSlots from "../../layouts/Dashboard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCities,
  createCity,
  updateCity,
  deleteCity,
} from "../../api/cities";
import {
  fetchHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../../api/hotels";
import {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../api/rooms";
import EntityForm from "../../ui/EntityForm";

const ENTITY_CONFIG = {
  cities: {
    label: "Cities",
    fetch: fetchCities,
    create: createCity,
    update: updateCity,
    delete: deleteCity,
    fields: [
      { name: "name", label: "Name" },
      { name: "description", label: "Description" },
    ],
  },
  hotels: {
    label: "Hotels",
    fetch: fetchHotels,
    create: createHotel,
    update: updateHotel,
    delete: deleteHotel,
    fields: [
      { name: "name", label: "Name" },
      { name: "description", label: "Description" },
      { name: "starRating", label: "Star Rating", type: "number" },
    ],
  },
  rooms: {
    label: "Rooms",
    fetch: fetchRooms,
    create: createRoom,
    update: updateRoom,
    delete: deleteRoom,
    fields: [
      { name: "roomNumber", label: "Room Number" },
      { name: "cost", label: "Cost", type: "number" },
    ],
  },
};

export default function AdminPage() {
  const [tab, setTab] = useState<"cities" | "hotels" | "rooms">("cities");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dialog/Form
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const entity = ENTITY_CONFIG[tab];

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [tab, { search, page, rowsPerPage }],
    queryFn: () =>
      entity.fetch({
        name: search,
        pageNumber: page + 1,
        pageSize: rowsPerPage,
      }),
    keepPreviousData: true,
  });

  const createMutation = useMutation({
    mutationFn: entity.create,
    onSuccess: () => {
      queryClient.invalidateQueries([tab]);
      setFormOpen(false);
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, ...rest }: any) => entity.update(id, rest),
    onSuccess: () => {
      queryClient.invalidateQueries([tab]);
      setFormOpen(false);
      setEditing(null);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: entity.delete,
    onSuccess: () => {
      queryClient.invalidateQueries([tab]);
    },
  });

  // Dialog open/close/submit
  const openCreateDialog = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEditDialog = (row: any) => {
    setEditing(row);
    setFormOpen(true);
  };
  const handleDelete = (id: number) => {
    if (window.confirm("Delete?")) deleteMutation.mutate(id);
  };
  const handleFormSave = (fields: any) => {
    if (editing && editing.id)
      updateMutation.mutate({ id: editing.id, ...fields });
    else createMutation.mutate(fields);
  };

  return (
    <DashboardLayoutSlots
      pathname="/admin"
      navigated={false}
      sidebar={<AdminSidebar tab={tab} setTab={setTab} />}
    >
      <Box p={4}>
        <Typography variant="h5" mb={2}>
          {entity.label}
        </Typography>
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <TextField
            size="small"
            label={`Search ${entity.label}`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            sx={{ width: 300 }}
          />
          <Tooltip title={`Create ${entity.label.slice(0, -1)}`}>
            <IconButton onClick={openCreateDialog} color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Paper sx={{ overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                {entity.fields.map((f) => (
                  <TableCell key={f.name}>{f.label}</TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={entity.fields.length + 1} align="center">
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : (
                (data ?? []).map((row: any) => (
                  <TableRow key={row.id}>
                    {entity.fields.map((f) => (
                      <TableCell key={f.name}>{row[f.name]}</TableCell>
                    ))}
                    <TableCell align="right">
                      <IconButton onClick={() => openEditDialog(row)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={1000}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Paper>
        {/* Create/Edit Dialog */}
        <EntityForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSave={handleFormSave}
          initialData={editing}
          fields={entity.fields}
          title={`${editing ? "Edit" : "Create"} ${entity.label.slice(0, -1)}`}
        />
      </Box>
    </DashboardLayoutSlots>
  );
}
