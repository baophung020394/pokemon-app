import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../apis/api";
import FilterPokemonSelected from "./FilterPokemonSelected";
import SelectedPokemonItem from "./SelectedPokemonItem";

const itemsPerPage = 12;

const SelectedPokemonList = ({
  pokemonIds,
  onRemovePokemon,
}: {
  pokemonIds: Array<number>;
  onRemovePokemon: (pokemonId: number) => void;
}) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState<
    {
      id: number;
      name: string;
      imageUrl: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const responses = await Promise.all(
        pokemonIds.map((id) => axiosClient.get(`pokemon/${id}`)),
      );
      setPokemonDetails(responses.map((res) => res.data));
    };
    fetchDetails();
  }, [pokemonIds]);

  useEffect(() => {
    // Reset to page 1 when filter changes
    setPage(1);
  }, [filter]);

  const filteredPokemonIds = pokemonDetails
    .filter((pokemon) => pokemon.name.includes(filter.toLowerCase()))
    .map((pokemon) => pokemon.id);

  const count = Math.ceil(filteredPokemonIds.length / itemsPerPage);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const displayedPokemonIds = filteredPokemonIds.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <FilterPokemonSelected filter={filter} setFilter={setFilter} />
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {displayedPokemonIds.map((pokemonId) => (
          <SelectedPokemonItem
            key={pokemonId}
            pokemonId={pokemonId}
            onRemove={onRemovePokemon}
          />
        ))}
      </Box>
      {filteredPokemonIds.length > 0 && (
        <Pagination
          count={count}
          page={page}
          onChange={handleChangePage}
          sx={{
            marginTop: 2,
            ".MuiPagination-ul": { justifyContent: "center" },
          }}
          color="primary"
        />
      )}
    </Box>
  );
};

export default SelectedPokemonList;
