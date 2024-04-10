import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../apis/api";

const PokemonList = ({
  onSelectPokemon,
  searchTerm,
}: {
  onSelectPokemon: (id: number) => void;
  searchTerm: string;
}) => {
  const [pokemonCache, setPokemonCache] = useState<{ [page: number]: any[] }>(
    {},
  );
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const handleSetPage = (page: Number) => {
    setSearchParams({ page: String(page) });
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      if (pokemonCache[page]) {
        return;
      }

      const offset = page;

      const response = await axiosClient.get(
        `pokemon?offset=${offset}&limit=${itemsPerPage}`,
      );

      setPokemonCache((prev) => ({
        ...prev,
        [page]: response.data.results,
      }));

      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    };

    fetchPokemon();
  }, [page, pokemonCache]);

  const pokemons = pokemonCache[page] || [];

  const filteredPokemon = searchTerm
    ? pokemons.filter((p) => p.name.includes(searchTerm.toLowerCase()))
    : pokemons;

  const handleSelect = (url: string) => {
    const id = url.split("/").filter(Boolean).pop();
    onSelectPokemon(Number(id));

    if (id) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("selectedPokemon", id);
      setSearchParams(newSearchParams);
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "background.paper", padding: 2, borderRadius: 0 }}
    >
      <List>
        {filteredPokemon.map((p) => (
          <ListItem
            key={p.name}
            onClick={() => handleSelect(p.url)}
            sx={{
              "&:hover": { backgroundColor: "action.hover" },
              cursor: "pointer",
            }}
          >
            <ListItemButton>
              <ListItemText
                primary={p.name}
                primaryTypographyProps={{ color: "text.primary" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => handleSetPage(value)}
        sx={{ marginTop: 2, ".MuiPagination-ul": { justifyContent: "center" } }}
      />
    </Box>
  );
};

export default PokemonList;
