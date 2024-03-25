import CloseIcon from "@mui/icons-material/Close";
import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../apis/api";

const SelectedPokemonItem = ({
  pokemonId,
  onRemove,
}: {
  pokemonId: number | 1;
  onRemove: (pokemonId: number) => void;
}) => {
  const [pokemon, setPokemon] = useState<{
    id: number;
    name: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axiosClient.get(`pokemon/${pokemonId}`);
      setPokemon({
        id: pokemonId,
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
      });
    };

    fetchPokemon();
  }, [pokemonId]);

  if (!pokemon) return null;

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
        onClick={() => onRemove(pokemonId)}
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
          image={pokemon.imageUrl}
          alt={pokemon.name}
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
