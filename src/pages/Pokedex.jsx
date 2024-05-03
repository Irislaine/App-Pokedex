import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/pokedex.css';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/PokeCard';
import PokeSelect from '../components/PokeSelect';
import PokePages from '../components/pokedex/PokePages';

const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('');

  const [inputValue, setInputValue] = useState('');

  const [pokemons, getPokemons, getType] = useFetch();

  const trainer = useSelector((store) => store.trainer);

  const [limit, setLimit] = useState(36);

  useEffect(() => {
    if (selectValue) {
      getType(selectValue);
    } else {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
      getPokemons(url);
    }
    window.scrollTo(0,0) 
  }, [selectValue, setLimit]);


  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = '';
  }

// console.log(pokemons)

  const pokeSearch = (poke) => {
    const perName = poke.name.includes(inputValue);
    return perName;
  }


  return (
    <>
      <header className='pokedex__header'>
        <img
          className='pokedex_img'
          src="/pokedex.png" alt=""
        />
      </header>
      <section className='pokedex'>
        <h2 className='pokedex__title'>
          <span>Welcome {trainer},</span> here you can find your favorite pokemon
        </h2>

        <div className='pokedex__search'>
          <form className='pokedex__form' onSubmit={handleSubmit}>
            <input
              className='pokedex__input'
              ref={textInput}
              type="text"
              placeholder='Search a pokemón'
            />

            <button className='pokedex__btn'>Search</button>
          </form>

          <PokeSelect
            setSelectValue={setSelectValue}
          />

        </div>
        <div>
          <PokePages
            pokemons={pokemons}
            getPokemons={getPokemons}
          />
        </div>

        <div className='pokedex__container'>
          {
            pokemons?.results.filter(pokeSearch).map((poke) => (
              <PokeCard
                key={poke.url}
                url={poke.url} />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Pokedex;