import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../apis/api";
import FilterPokemonSelected from "./FilterPokemonSelected";
import SelectedPokemonItem from "./SelectedPokemonItem";

const itemsPerPage = 12;

const SelectedPokemonList = ({
  pokemonId,
  pokemonIds,
}: {
  pokemonId: number | undefined;
  pokemonIds: Array<number> | [];
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
  const [pokemonCache, setPokemonCache] = useState<{
    [pokemonId: number]: any;
  }>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (pokemonId) {
        if (pokemonCache[`${pokemonId}`]) {
          return;
        }
        const responses = await axiosClient.get(`pokemon/${pokemonId}`);

        setPokemonDetails((prev) => [
          ...prev,
          {
            id: responses.data.id,
            name: responses.data.name,
            imageUrl: responses.data.sprites?.front_default,
          },
        ]);
        setPokemonCache((prev) => ({
          ...prev,
          [`${pokemonId}`]: responses.data,
        }));
      }
    };
    fetchDetails();
  }, [pokemonId, pokemonCache]);

  useEffect(() => {
    // Reset to page 1 when filter changes
    setPage(1);
  }, [filter]);

  const filteredPokemonIds = pokemonDetails
    .filter((pokemon) => pokemon.name.includes(filter.toLowerCase()))
    .map((pokemon) => pokemon.id);

  const count = Math.ceil(pokemonDetails.length / itemsPerPage);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const hanleRemovePokemon = (pokemonId: number) => {
    setPokemonDetails((prev) => prev.filter((item) => item?.id !== pokemonId));
  };

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
        {filteredPokemonIds.map((id) => (
          <SelectedPokemonItem
            key={id}
            pokemonId={id}
            pokemon={id && pokemonCache[`${id}`]}
            onRemove={hanleRemovePokemon}
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
