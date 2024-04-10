import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Filter from "./components/Filter";
import PokemonDetail from "./components/PokemonDetail";
import PokemonList from "./components/PokemonList";
import SelectedPokemonList from "./components/SelectedPokemonList";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<number | undefined>(
    undefined,
  );
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

  return (
    <BrowserRouter>
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
                pokemonId={selectedPokemon}
                pokemonIds={selectedPokemonList}
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
    </BrowserRouter>
  );
}

export default App;
