import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/pokedex.css';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/PokeCard';
import PokeSelect from '../components/PokeSelect';

const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pokemons, getPokemons, getType] = useFetch();

  const trainer = useSelector(store => store.trainer);

  useEffect(() => {
    if (selectValue) {
      getType(selectValue);
    } else {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=50';
      getPokemons(url);
    }}, [selectValue]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = '';
  }

  // console.log(pokemons);

  const pokeSearch = (poke) => {
    const perName = poke.name.includes(inputValue);
    return perName;
  }

  // const pagination = () => {
  //   pokemons?.results.filter(pokeSearch).slice()
  //   return
  // }

  return (
    <>
    <header className='pokedex__header'>
    </header>
    <section className='pokedex'>
      <h2 className='pokedex__title'><span>Welcome {trainer},</span> here you can find your favorite pokemon</h2>

      <div className='pokedex__search'>
        <form onSubmit={handleSubmit}>
          <input ref={textInput} type="text" />
          <button className='pokedex__btn'>Search</button>
        </form>

        <PokeSelect
          setSelectValue={setSelectValue}
        />
      </div>

      <div className='pokedex__container'>
        {
          // pagination?.results.filter(pokeSearch)
          pokemons?.results.filter(pokeSearch).map((poke) => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </div>
    </section>
    </>
  )
}

export default Pokedex;