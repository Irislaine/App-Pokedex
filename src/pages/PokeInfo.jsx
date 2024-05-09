import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import StatProgress from '../components/StatProgress/StatProgress';
import './styles/pokeInfo.css';
import { useBgColorCard } from "../hooks/useBgColorCard";


const PokeInfo = () => {

  const params = useParams();

  const [pokemon, getPokemon] = useFetch();

  const [colors] = useBgColorCard(
    pokemon?.sprites.other?.['official-artwork'].front_default 
  );

  useEffect(() => {
    console.log(params.id)
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
    getPokemon(url);
  }, [])


  console.log(pokemon);

  return (
    <>
      <header className='pokemon_header'>
        <img
          className='pokedex_img'
          src="../../pokedex.png" alt="pokemon/header/img"
        />
      </header>

      <main className="pokeinfo__content">
        <article className="pokeinfo__container--stats">
          <div
            style={{
              background: `linear-gradient(rgb(${colors[0]}), rgb(${colors[5]}))`,
            }}
            className={`pokeinfo__back ${pokemon?.types[0].type.name} `}
          >
            <figure className="pokeinfo__figure__poke">
              <img
                className="pokeinfo__image"
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt="pokemonimage"
              />
            </figure>
          </div>
          <div className="pokeinfo__info">
            <div className="pokeinfo__id__head">
              <span
                style={{
                  color: `rgb(${colors[3]})`,
                }}
                className="pokeinfo__id"
              >
                # {pokemon?.id}
              </span>
            </div>

            <h2
              className="pokeinfo__pokename"
              style={{
                color: `rgb(${colors[0]})`,
              }}
            >
              {pokemon?.name}
            </h2>

            <ul className="pokeinfo__ul__wh">
              <li>
                <span>weight</span>
                <span>{pokemon?.weight}</span>
              </li>
              <li>
                <span>height</span>
                <span>{pokemon?.height}</span>
              </li>
            </ul>
            <div className="pokeinfo__skills">
              <article>
                <h3>Type</h3>
                <ul style={{ color: "#777" }}>
                  {pokemon?.types.map((type) => (
                    <li
                      style={{
                        background: `rgba(${colors[0]})`,
                      }}
                      key={type.type.url}>{type.type.name}
                    </li>
                  ))}
                </ul>
                
              </article>
              <article>
                <h3>Skills</h3>
                <ul>
                  {pokemon?.abilities.map((skill) => (
                    <li key={skill.ability.url}
                    >
                      {skill.ability.name}</li>
                  ))}
                </ul>
              </article>
            </div>
            <div className='pokemon_stats'>
              <h2 className='pokemon_stats_title'>Stats</h2>
              <ul >
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
            </div>
          </div>
        </article>
        <article className="pokeinfo__movements">
          <h2 className="pokeinfo__movement__title">Movements</h2>
          <ul className="pokeinfo__movements__list">
            {pokemon?.moves.map((move) => (
              <li key={move.move.url}>{move.move.name}</li>
            ))}
          </ul>
        </article>
      </main>
    </>
  );
};


export default PokeInfo;