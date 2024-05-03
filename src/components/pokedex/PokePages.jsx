import React, { useState } from 'react';
import './styles/pokePages.css';

const PokePages = ({ pokemons, getPokemons }) => {
    const [currentPage, setCurrentPage] = useState(1);

    
    const handlePrevious = () => {
        if (pokemons.previous) {
            getPokemons(pokemons.previous);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (pokemons.next) {
            getPokemons(pokemons.next);
            setCurrentPage(currentPage + 1);
        }
    };

    console.log(pokemons);

    return (
        <div className="pagination">
            <button onClick={handlePrevious} className="pagination_btn--1">
                {"<<"} prev
            </button>
            <span className="pagination_span">{currentPage}</span>
            <button onClick={handleNext} className="pagination_btn--2">
                next {">>"}
            </button>
        </div>
    );
};


export default PokePages;