import CloseIcon from "@mui/icons-material/Close";
import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";

const SelectedPokemonItem = ({
  pokemon,
  pokemonId,
  onRemove,
}: {
  pokemonId: number | 1;
  onRemove: (pokemonId: number) => void;
  pokemon: any;
}) => {
  if (pokemon === undefined) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 1,
        backgroundColor: "background.paper",
        borderRadius: 2,
        padding: 1,
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => onRemove(pokemon?.id)}
        size="small"
        sx={{ position: "absolute", right: 10, top: 5, color: "error.main" }}
      >
        <CloseIcon />
      </IconButton>
      <Card
        sx={{
          width: 80,
          height: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "secondary.main",
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          image={pokemon.sprites?.front_default}
          alt={pokemon?.sprites?.front_default}
          sx={{ width: "auto", maxHeight: "100%" }}
        />
      </Card>
      <Typography variant="caption" sx={{ color: "text.primary", mt: 1 }}>
        {pokemon.name.toUpperCase()}
      </Typography>
    </Box>
  );
};
export default SelectedPokemonItem;
