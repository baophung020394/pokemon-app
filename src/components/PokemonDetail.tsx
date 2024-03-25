import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../apis/api";

const PokemonDetail = ({ pokemonId }: { pokemonId: number }) => {
  const [pokemonDetail, setPokemonDetail] = useState<any>(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await axiosClient.get(`pokemon/${pokemonId}`);
      setPokemonDetail(response.data);
    };
    fetchPokemonDetail();
  }, [pokemonId]);

  if (!pokemonDetail) return null;

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        margin: 2,
        color: "text.primary",
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {pokemonDetail.name.toUpperCase()}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              {pokemonDetail.sprites.front_default && (
                <CardMedia
                  component="img"
                  image={pokemonDetail.sprites.front_default}
                  alt={`Front view of ${pokemonDetail.name}`}
                  sx={{ width: "auto", height: 150 }}
                />
              )}
              {pokemonDetail.sprites.back_default && (
                <CardMedia
                  component="img"
                  image={pokemonDetail.sprites.back_default}
                  alt={`Back view of ${pokemonDetail.name}`}
                  sx={{ width: "auto", height: 150 }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                marginBottom: 2,
              }}
            >
              {pokemonDetail.types.map((type: any) => (
                <Chip
                  label={type.type.name.toUpperCase()}
                  key={type.type.name}
                  sx={{ backgroundColor: "secondary.main", color: "white" }}
                />
              ))}
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              Height: {pokemonDetail.height * 10} cm
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Weight: {pokemonDetail.weight / 10} kg
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
              Abilities:
            </Typography>
            <List>
              {pokemonDetail.abilities.map((ability: any, index: number) => (
                <ListItem key={index} sx={{ paddingLeft: 0 }}>
                  <ListItemText
                    primary={ability.ability.name.toUpperCase()}
                    primaryTypographyProps={{ color: "primary.main" }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PokemonDetail;
