import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
} from "@mui/material";
import axiosClient from "../apis/api";

const PokemonList = ({
  onSelectPokemon,
  searchTerm,
}: {
  onSelectPokemon: (id: number) => void;
  searchTerm: string;
}) => {
  const [pokemon, setPokemon] = useState<{ name: string; url: string }[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      const offset = (page - 1) * itemsPerPage;
      const response = await axiosClient.get(
        `pokemon?offset=${offset}&limit=${itemsPerPage}`,
      );
      setPokemon(response.data.results);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    };
    fetchPokemon();
  }, [page, searchTerm]);

  const filteredPokemon = searchTerm
    ? pokemon.filter((p) => p.name.includes(searchTerm.toLowerCase()))
    : pokemon;

  const handleSelect = (url: string) => {
    const id = url.split("/").filter(Boolean).pop();
    onSelectPokemon(Number(id));
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

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
        onChange={(_, value) => setPage(value)}
        sx={{ marginTop: 2, ".MuiPagination-ul": { justifyContent: "center" } }}
      />
    </Box>
  );
};

export default PokemonList;
