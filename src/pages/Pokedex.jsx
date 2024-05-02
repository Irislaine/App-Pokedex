import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/pokedex.css';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/PokeCard';
import PokeSelect from '../components/PokeSelect';
import Pagination from '../components/pagination/Pagination';

const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pokemons, getPokemons, getType] = useFetch();

  const limit = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const trainer = useSelector(store => store.trainer);

  useEffect(() => {
    if (selectValue) {
      getType(selectValue);
    } else {
      const offset = currentPage * limit - limit
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      getPokemons(url);
    }
    window.scrollTo(0,0)
  }, [selectValue, currentPage]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = '';
  }

  const pokeSearch = (poke) => {
    const perName = poke.name.includes(inputValue);
    return perName;
  }

  return (
    <>
      <header className='pokedex__header'>
      </header>
      <section className='pokedex'>
        <h2 className='pokedex__title'><span>Welcome {trainer},</span> here you can find your favorite pokemon</h2>

        <div className='pokedex__search'>
          <form className='pokedex__form' onSubmit={handleSubmit}>
            <input className='pokedex__input' ref={textInput} type="text" 
             placeholder='Search a pokemón'/>
            <button className='pokedex__btn'>Search</button>
          </form>
          </div> 

          <PokeSelect
            setSelectValue={setSelectValue}
          />

        <div className='pokedex__container'>
          {
            pokemons?.results.filter(pokeSearch).map((poke) => (
              <PokeCard
                key={poke.url}
                url={poke.url}
              />
            ))
          }
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(pokemons?.count / limit) || 0}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  )
}

export default Pokedex;