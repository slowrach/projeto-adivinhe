import styles from "./app.module.css"
import { useEffect, useState } from "react"
import { Saints, Challenge } from "./utils/saints"
import { Header } from "./components/Header/header"
import { Tip } from "./components/Tip/tip"
import { Letter } from "./components/Letter/letter"
import { Input } from "./components/Input/input"
import { Button } from "./components/Button/button"
import { LettersUsed, LettersUsedProps } from "./components/LettersUsed/letters-used"

export function App() {
  const [score, setScore] = useState(0)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const[letter, setLetter] = useState("")
  const [letterUsed, setLetterUsed] = useState<LettersUsedProps[]>([])

  function restart() {
    start()
  }

  function start() {
    const index = Math.floor(Math.random() * Saints.length)

    const randomWord = Saints[index]

    setChallenge(randomWord)
    setScore(0)
    setLetter("")
    setLetterUsed([])
  }

  function confirm() {
    if(!challenge) {
      return
    }

    if(!letter.trim()) {
      return alert("Digite uma letra")
    }

    const value = letter.toUpperCase()
    const exists = letterUsed.find((used) => used.value.toUpperCase() === value)

    if(exists) {
      setLetter("")
      return alert("Você já utilizou a letra " + value)
    }

    const contains = challenge.saint.toUpperCase().split("").filter((char) => char === value).length

    const correct = contains > 0

    const currentScore = score + contains

    setLetterUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)

    setLetter("")
  }

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    if(!challenge) {
      return
    }

    setTimeout(() => {
      if (score === challenge.saint.length){
        return alert("Parabéns, você descobriu o santo!")
      }

      if(letterUsed.length === 10){
        return alert("Você utilizou todas as tentativas")
      }
    }, 300)
  }, [score, letterUsed.length])

  if(!challenge) {
    return
  }

  return (
    <div className={styles.container}>
      <Header current={letterUsed.length} max={10} onRestart={restart}/>
      
      <Tip tip={challenge.tip}/>

      <div className={styles.word}>
        {
          challenge.saint.split("").map((letter, index) => {
            const compare = letterUsed.find((used) => used.value.toUpperCase() === letter.toUpperCase())

            return <Letter key={index} value={compare?.value} color={compare?.correct ? "correct" : "default"}/>
          })
        }
        
      </div>

      <h4>Palpite</h4>
      
      <div className={styles.guess}>
        <Input maxLength={1} onChange={(e) => setLetter(e.target.value)}/>
        <Button title="Confirmar" onClick={confirm}/>
      </div>

      <LettersUsed data={letterUsed}/>
    </div>
  )
}
