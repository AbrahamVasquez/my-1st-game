import { useState, useEffect } from 'react';
import './App.css'
import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import {  getRamdomWorld } from "./helpers/getRamdomWorld";


function App() {

  const [ word, setWord ] = useState(getRamdomWorld());
  const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat(word.length) );
  const [ attempts, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState( false );
  const [ won, setWon ] = useState( false );


  //Determinar si la persona perdio
  useEffect( () => {
    if( attempts >= 9 ){
     setLose ( true );
    }
  }, [ attempts ] ); //Mejor cononcidos como Hooks

  //Determinar si la persona gano
  useEffect( () => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if ( currentHiddenWord === word ) {
      setWon( true );
    }
  }, [ hiddenWord ] );


  const checkLetter = ( letter:string ) => {
    if ( lose ) { 
    return;
    }

    if ( !word.includes(letter) ) {
      setAttempts( Math.min( attempts + 1, 9 ) );
      return;
    }

      const hiddenWordArray = hiddenWord.split(' ');
      console.log( hiddenWordArray );

      for( let i = 0; i < word.length; i++ ) {
        if ( word[i] === letter ) {
          hiddenWordArray[i] = letter;
        }
      }
      setHiddenWord( hiddenWordArray.join(' ') );
  }

      const newGame = () => {
        const newWord = getRamdomWorld();

        setWord( newWord );
        setHiddenWord('_ '.repeat(word.length) );

        setAttempts( 0 );
        setLose( false );
        setWon( false );
        
      }

  return (
  <div className="card">

    {/* Imagenes */}
    <HangImage imageNumber={attempts}/>

    {/* Palabar Oculta */}
    <h3>{hiddenWord}</h3>

    {/* Intentos */}
    <h3>Intentos: { attempts}</h3>

    {/* Mensaje si perdio */}
    {
      ( lose )
       ? <h2>Perdio { word }</h2>
       : ''
    }

    {/* Mensaje si gano */}
    {
      ( won )
       ? <h2>Felicidades, usted gano</h2>
       : ''
    }

    {/* Botones de Letras */}
    {
      letters.map( (letter) => (
        <button
        onClick={ () => checkLetter(letter) }
          key={ letter }>
          {letter}
        </button>
      ))
    }

    <br /><br />
    <button onClick={ newGame }>Nuevo Juego?</button>


  </div>
  );
};

export default App;
