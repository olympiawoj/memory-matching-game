import React, { useEffect, useState } from 'react';
import './App.css';
import shuffle from 'lodash.shuffle'

// image for the pokemon
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png

const pokemon = [
  { id: 4, name: 'charizard' },
  { id: 10, name: 'caterpie' },
  { id: 77, name: 'ponyta' },
  { id: 108, name: 'lickitung' },
  { id: 132, name: 'ditto' },
  { id: 133, name: 'eevee' },
];

const doublePokemon = shuffle([...pokemon, ...pokemon])

export default function App() {
  const [opened, setOpened] = useState([])

  useEffect(()=>{
    // clear cards after 2 have been selected
    if(opened.length === 2) setTimeout(()=> setOpened([]), 800)

  }, [opened])
  
  function flipCard(index) {

    setOpened((opened) => [...opened, index])
  }

  return <div className="app">
    <div className="cards">
      {doublePokemon.map((pokemon, index) => {
        let isFlipped = false;

        // do some logic to check if flipped
        if (opened.includes(index)) isFlipped = true;

        return (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            isFlipped={isFlipped}
            flipCard={flipCard}
            index={index}
          />
        )
      })}
    </div>
  </div>;
}

function PokemonCard({ pokemon, isFlipped, index, flipCard}) {
  return (
    <button className={`pokemon-card ${isFlipped ? 'flipped' : ''}`} onClick={()=>flipCard(index)}>
      <div className="inner">
        <div className="front">
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name} width="100" />
        </div>
        <div className="back">
          ?
    </div>
      </div>

    </button>
  )
}