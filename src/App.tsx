import { Container, Grid } from "@mui/material";
import { useState } from "react";
import Filter from "./components/Filter";
import PokemonDetail from "./components/PokemonDetail";
import PokemonList from "./components/PokemonList";
import SelectedPokemonList from "./components/SelectedPokemonList";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<number | undefined>(1);
  const [selectedPokemonList, setSelectedPokemonList] = useState<Array<number>>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectPokemon = (pokemonId: number) => {
    setSelectedPokemon(pokemonId);
    if (!selectedPokemonList.includes(pokemonId)) {
      setSelectedPokemonList([...selectedPokemonList, pokemonId]);
    }
  };

  const handleRemoveSelectedPokemon = (pokemonId: number) => {
    setSelectedPokemonList((prev) => prev.filter((id) => id !== pokemonId));
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        height: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ paddingBottom: 2 }}>
          <Grid item xs={12} md={6}>
            {selectedPokemon && <PokemonDetail pokemonId={selectedPokemon} />}
            <SelectedPokemonList
              pokemonIds={selectedPokemonList}
              onRemovePokemon={handleRemoveSelectedPokemon}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Filter onSearchTermChange={setSearchTerm} />
            <PokemonList
              onSelectPokemon={handleSelectPokemon}
              searchTerm={searchTerm}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default App;
