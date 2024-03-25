import React from "react";
import { TextField } from "@mui/material";

const FilterPokemonSelected = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextField
      sx={{
        marginBottom: 2,
        input: { color: "text.primary" },
        width: "80%",
        backgroundColor: "background.paper",
      }}
      variant="outlined"
      label="Filter Pokemon"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      color="primary"
    />
  );
};

export default FilterPokemonSelected;
