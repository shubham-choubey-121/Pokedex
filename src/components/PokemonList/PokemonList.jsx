
import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";


function PokemonList() {

     const [poke, setPoke] = useState([]);
     const [loading, setLoading] = useState(true);

     const fetchPokemon = async () =>{

        const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
        console.log(response.data);

        const pokemonResult = response.data.results;
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url)); 
        
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);

// Extracting the necessary details from the Pokémon data
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
            id : pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            types: pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')
     

            }
        });

        console.log(res);
        setPoke(res);
        setLoading(false);

        
    }

    

    useEffect(() =>{
           
            fetchPokemon();

        }, []);



    return(
        <div className="Pokemon-List">
            <h1>Pokemon List</h1>
            <div className="card-box">
                {loading ? 'Loading .....' : 
                    poke.map((p) => (
                    <Pokemon
                        name={p.name} 
                        image={p.image}
                        types={p.types} 
                        key={p.id}
                    />
                ))
                }
            
            </div>
        </div>
    )

}




export default PokemonList;
