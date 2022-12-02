import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "../components/Card";
import NavBar from "../components/NavBar";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Grid container>
          {pokemons.map((pokemon) => {
            <Grid item xs={3}>
              <PokemonCard />
            </Grid>;
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
