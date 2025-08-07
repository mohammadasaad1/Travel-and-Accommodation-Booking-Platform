import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const amenities = [
  "WiFi",
  "Pool",
  "Spa",
  "Restaurant",
  "Gym",
  "Beach Access",
  "Bar",
  "Parking",
];

export default function SideBarFilters({ filters, onFilterChange }) {
  const [price, setPrice] = useState(30); // can loop over all hotels to get a max price.
  const handleOnchange = (e: Event, newValue: number) => {
    setPrice(typeof newValue === "number" ? newValue : -1);
  };
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography fontWeight={700}>Filters</Typography>
      </AccordionSummary>
      <AccordionActions sx={{ display: "block" }}>
        <AccordionDetails>
          <Typography variant="h6" fontWeight={600}>
            Price Range
          </Typography>
          <Typography variant="body2">Price : {" " + price}$</Typography>
          <Slider
            aria-label="Price"
            defaultValue={price}
            valueLabelDisplay="auto"
            step={300}
            marks
            min={0}
            max={3000}
            onChange={handleOnchange}
          />
          <Typography variant="body2" fontWeight={600} mb={1}>
            Star Rating
          </Typography>
          <Box display={"flex"} flexDirection={"column"} flexBasis={2}>
            {[5, 4, 3, 2, 1].map((stars) => (
              <FormControlLabel
                key={stars}
                control={<Checkbox size="small" />}
                label={
                  <Stack direction="row">
                    {[...Array(stars)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{ color: "#ffd600", fontSize: 18 }}
                      />
                    ))}
                  </Stack>
                }
              />
            ))}
          </Box>
          <Typography variant="body2" fontWeight={600} mt={2} mb={1}>
            Amenities
          </Typography>
          <FormGroup>
            {amenities.map((amenity) => (
              <FormControlLabel
                key={amenity}
                control={<Checkbox size="small" />}
                label={amenity}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </AccordionActions>
    </Accordion>
  );
}
