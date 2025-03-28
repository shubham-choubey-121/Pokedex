
import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";




function PokemonList() {

     const [poke, setPoke] = useState([]);
     const [loading, setLoading] = useState(true);
     const [pokedex_Url, setPokedex_Url] = useState("https://pokeapi.co/api/v2/pokemon"); 
     const [prev, setPrev]=useState('');
     const [next, setNext]=useState('');

    //fetching by using axios
     const fetchPokemon = async () =>{
        setLoading(true);
        const response = await axios.get(pokedex_Url)
        console.log(response.data);

        setPrev(response.data.previous);
        setNext(response.data.next);

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

        }, [pokedex_Url]);



    return(
        <div className="Pokemon-List">
             <div className="btn-controls">
                <button disabled={prev === null} onClick={() => setPokedex_Url(prev)}>prev</button>
                <button disabled={next === null} onClick={() => setPokedex_Url(next)}>next</button>
            </div>
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
