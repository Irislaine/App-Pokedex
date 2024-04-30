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
       dispatch (setTrainer(textInput.current.value.trim()));
      //  textInput.current.value = '';
       navigate('/pokedex')
    }


  return (
    <div className='home'>
      <h1>Hi Trainer!</h1>
      <h2>To start, give me your name</h2>
      <br />
        <form onSubmit={handleSubmit}>
            <input ref={textInput} type="text" />
            <button className='btn'>Start</button>
        </form>
    </div>
  )
}

export default HomePage;