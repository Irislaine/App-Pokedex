import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import StatProgress from '../components/StatProgress/StatProgress';

const PokeInfo = () => {

  const params = useParams();

  const [pokemon, getPokemon] = useFetch();

  useEffect(() => {
    console.log(params.id)
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
    getPokemon(url);
  }, [])
  

  console.log(pokemon);


  return (
    <section>
      <figure><img src={pokemon?.sprites.other['official-artwork'].front_default} alt="poken image" /></figure>
      <span># {pokemon?.id}</span>
      <h2>{pokemon?.name}</h2>
      <ul>
        <li><span>weigth</span><span>{pokemon?.weigth}</span></li>
        <li><span>height</span><span>{pokemon?.height}</span></li>

      </ul>
      <div>
        <article>
          <h3>type</h3>
          <ul>
            {
              pokemon?.types.map(type => (
                <li key={type.type.url}>{type.type.name}</li>
              ))
            }
          </ul>
        </article>


        <article>
          <h3>skills</h3>
          <ul>
            {
              pokemon?.abilities.map(skill => (
                <li key={skill.ability.url}>{skill.ability.name}</li>
              ))
            }
          </ul>
        </article>
      </div>

      <h2>Stats</h2>
      <ul>
        {
          pokemon?.stats.map(stat => (
            <StatProgress
              key={stat.stat.url}
              statName={stat.stat.name}
              statValue={stat.base_stat}
            />
          ))
        }
      </ul>

      <h2>Movements</h2>
      <ul>
        {
          pokemon?.moves.slice(0,10).map(move => (
            <li key={move.move.url}>{move.move.name}</li>
          ))
        }
      </ul>
    </section>
  )
}

export default PokeInfo;