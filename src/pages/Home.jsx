import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "../components/Card";
import NavBar from "../components/NavBar";
import Skeletons from "../components/Skeletons";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    let endpoints = [];
    for (let i = 1; i < 200; i++) {
      endpoints.push(`http://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    let response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res))
      .catch((err) => console.log(err));

    // axios
    //   .get("https://pokeapi.co/api/v2/pokemon?limit=50")
    //   .then((res) => setPokemons(res.data.results))
    //   .catch((err) => console.log(err));
  };

  const pokemonFilter = (name) => {
    let filteredPokemons = [];
    if (name === "") {
      getPokemon();
    }
    for (let i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }
    setPokemons(filteredPokemons);
  };
  return (
    <>
      <NavBar pokemonFilter={pokemonFilter} />
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <PokemonCard
                  name={pokemon.data.name}
                  image={pokemon.data.sprites.front_default}
                  types={pokemon.data.types}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
