import React from "react";
import { Box, TextField } from "@mui/material";

interface FilterProps {
  onSearchTermChange: (searchTerm: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onSearchTermChange }) => {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "background.default",
        borderRadius: 0,
      }}
    >
      <TextField
        fullWidth
        label="Search Pokemon"
        variant="outlined"
        onChange={(e) => onSearchTermChange(e.target.value)}
        InputLabelProps={{
          style: { color: "#aaa" },
        }}
        sx={{
          input: { color: "#fff" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "primary.main",
            },
            "&:hover fieldset": {
              borderColor: "secondary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "secondary.main",
            },
          },
        }}
      />
    </Box>
  );
};

export default Filter;
