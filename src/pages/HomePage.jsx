import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setTrainer } from '../store/slices/trainer.slice';
import { useNavigate } from 'react-router-dom';
import './styles/homepage.css'


const HomePage = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainer(textInput.current.value.trim()));
    //  textInput.current.value = '';
    navigate('/pokedex')
  }


  return (
    <div className='home'>
      <header className='header-container'>
        <img src="public/pokedex-home.png" alt="pokedex" />
      </header>

      <h1>Hi Trainer!</h1>

      <h2>To start, give me your name</h2>

      <form className='home-form' onSubmit={handleSubmit}>
        <input 
          className='home-input'
          placeholder='Your name...'
          ref={textInput} type="text"
        />

        <button className='home-btn'>Start</button>
      </form>

      <footer className='home-footer' />
    </div>
  )
}

export default HomePage;