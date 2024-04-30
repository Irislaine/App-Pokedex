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


    const handlePokemon = () => {
        navigate(`/pokedex/${pokemon.id}`);
    }

    return (
        <>

            <article onClick={handlePokemon} className={`pokecard pokecard--${pokemon?.types[0].type.name}`}>

                <div className={`pokecard_back ${pokemon?.types[0].type.name}`}></div>

                <figure className='pokecard_img'>
                    <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
                </figure>

                <h3 className={`stats--${pokemon?.types[0].type.name}`}>{pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}</h3>
                <ul className='pokecard_types'>
                    {
                        pokemon?.types.map(type => (
                            <li className={`slot${type.slot}`} key={type.type.url}>{type.type.name}</li>
                        ))
                    }
                </ul>
                <span>Type:</span>
                <hr />
                <ul className='pokecard_stats'>
                    {
                        pokemon?.stats.map(stat => (
                            !stat.stat.name.includes('-') &&
                            <li key={stat.stat.url}><span className={`stats--${pokemon?.types[0].type.name}`}>{stat.stat.name.toUpperCase()}<span></span>{stat.base_stat}</span></li>
                        ))
                    }
                </ul>
            </article>
        </>
    )
}

export default PokeCard;