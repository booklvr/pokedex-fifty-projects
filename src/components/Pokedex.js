import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

const COLORS = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
}

const POKEMON_COUNT = 150

const Pokedex = () => {
  const [pokemonCollection, setPokemonCollection] = useState([])
  const main_types = Object.keys(COLORS)

  const getPokemonCollection = async () => {
    const pokemonArray = []
    for (let i = 1; i <= POKEMON_COUNT; i++) {
      const pokemon = await getPokemon(i)

      pokemonArray.push(pokemon)
    }

    setPokemonCollection(pokemonArray)
  }

  const getPokemon = async (id) => {
    const APIURL = 'https://pokeapi.co/api/v2/pokemon/'
    try {
      const { data } = await axios(APIURL + id)

      const name = data.name[0].toUpperCase() + data.name.slice(1)
      const _id = data.id.toString().padStart(3, '0')

      const poke_types = data.types.map((type) => type.type.name)
      const type = main_types.find((type) => poke_types.indexOf(type) > -1)
      const color = COLORS[type]

      return { name, id, poke_types, type, color }

      // setPokemonCollection(() => [
      //   ...pokemonCollection,
      //   { name, id, poke_types, type, color },
      // ])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPokemonCollection()
  })

  return (
    <Fragment>
      <h1>Pokedex</h1>
      <div className='poke-container'>
        {pokemonCollection.length > 0 &&
          pokemonCollection.map((pokemon) => (
            <div
              key={pokemon.id}
              className='pokemon'
              style={{ backgroundColor: pokemon.color }}
            >
              <div className='img-container'>
                <img
                  src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                  alt=''
                />
              </div>
              <div className='info'>
                <span className='number'>{pokemon.id}</span>
                <h3 className='name'>{pokemon.name}</h3>
                <small className='type'>
                  Type: <span>{pokemon.type}</span>{' '}
                </small>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  )
}

export default Pokedex
