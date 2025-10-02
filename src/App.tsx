import styles from "./app.module.css"
import { useEffect, useState } from "react"
import { Saints, Challenge } from "./utils/saints"
import { Header } from "./components/Header/header"
import { Tip } from "./components/Tip/tip"
import { Letter } from "./components/Letter/letter"
import { Input } from "./components/Input/input"
import { Button } from "./components/Button/button"
import { LettersUsed, LettersUsedProps } from "./components/LettersUsed/letters-used"
import { Message } from "./components/Message/message"

export function App() {
  const [message, setMessage] = useState("")
  const [score, setScore] = useState(0)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const[letter, setLetter] = useState("")
  const [letterUsed, setLetterUsed] = useState<LettersUsedProps[]>([])
  const [shake, setShake] = useState(false)

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
      return setMessage("Digite uma letra")
    }

    const value = letter.toUpperCase()
    const exists = letterUsed.find((used) => used.value.toUpperCase() === value)

    if(exists) {
      setLetter("")
      return setMessage("Você já utilizou a letra " + value)
    }

    const contains = challenge.saint.toUpperCase().split("").filter((char) => char === value).length

    const correct = contains > 0

    const currentScore = score + contains

    setLetterUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)

    setLetter("")

    if(!correct){
      setShake(true)

      setTimeout(() => {
        setShake(false)
      }, 300)
    }
  }

  function clear(){
    setMessage("")
  }

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    if(!challenge) {
      return
    }

    if (score === challenge.saint.length){
      setMessage("Parabéns, você descobriu o santo! 🎉")
      start()
    }

    if(letterUsed.length === 10){
      setMessage("Você utilizou todas as tentativas 😢")
      start()
    }
  }, [score, letterUsed])

  if(!challenge) {
    return
  }

  return (
    <div className={styles.container}>
      {message.length > 0 &&<Message message={message} clear={clear}/>}

      <Header current={letterUsed.length} max={10} onRestart={start}/>
      
      <Tip tip={challenge.tip}/>

      <div className={`${styles.word} ${shake && styles.shake}`}>
        {
          challenge.saint.split("").map((letter, index) => {
            const compare = letterUsed.find((used) => used.value.toUpperCase() === letter.toUpperCase())

            return <Letter key={index} value={compare?.value} color={compare?.correct ? "correct" : "default"}/>
          })
        }
        
      </div>

      <h4>Palpite</h4>
      
      <div className={styles.guess}>
        <Input maxLength={1} value={letter} onChange={(e) => setLetter(e.target.value)}/>
        <Button title="Confirmar" onClick={confirm}/>
      </div>

      <LettersUsed data={letterUsed}/>
    </div>
  )
}
