import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pokedex/styles/pokeCard.css'
import useFetch from '../hooks/useFetch';

function PokeCard({ url }) {

  const [pokemon, getPokemon] = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    getPokemon(url);
  }, [])

  console.log(pokemon)

  const capitalizeFirstLetter = (word) => 
    word?.charAt(0).toUpperCase() + word?.slice(1)

  const handlePokemon = () => {
    navigate(`/pokedex/${pokemon.id}`);
  }

  return (
    <article 
      onClick={handlePokemon}
      className={`pokecard pokecard--${pokemon?.types[0].type.name}`}
    >
      <div className={`pokecard_back ${pokemon?.types[0].type.name}`}></div>

      <figure className='pokecard_img'>
        <img
          src={pokemon?.sprites.other['official-artwork'].front_default}
          alt="pokemon image"
        />
      </figure>

      <div className='pokecard_info'>
        <h3 className={`stats--${pokemon?.types[0].type.name}`} >
          {capitalizeFirstLetter(pokemon?.name)}
        </h3>
      </div>

      <ul className='pokecard_types'>
        {
          pokemon?.types.map(type => (
            <li
              className={`slot${type.slot}`}
              key={type.type.url}
            >
              {capitalizeFirstLetter(type.type.name)}
            </li>
          ))
        }
      </ul>

      <span className='pokecard_type'>Type</span>

      <hr />

      <ul className='pokecard_stats'>
        {
          pokemon?.stats.map(stat => (
            !stat.stat.name.includes('-') &&
            <li key={stat.stat.url}>
              <span className='pokecard_stat_name'>     
                {stat.stat.name.toUpperCase()}
              </span>
            
              <span className={`pokecard_stat_value stats--${pokemon?.types[0].type.name}`}>
                {stat.base_stat}
              </span>
            </li>
          ))
        }
      </ul>
    </article>
  )
}

export default PokeCard;