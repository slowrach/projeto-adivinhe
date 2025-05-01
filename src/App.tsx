import styles from "./app.module.css"
import { Header } from "./components/Header/header"
import { Tip } from "./components/Tip/tip"
import { Letter } from "./components/Letter/letter"
import { Input } from "./components/Input/input"
import { Button } from "./components/Button/button"

export function App() {
  function restart() {
    alert("oi")
  }

  return (
    <div className={styles.container}>
      <Header current={5} max={10} onRestart={restart}/>
      
      <Tip tip="Exemplo de dica"/>

      <div className={styles.word}>
        <Letter value="P"/>
        <Letter value="A"/>
        <Letter value="U"/>
        <Letter value="L"/>
        <Letter value="O"/>
      </div>

      <h4>Palpite</h4>
      
      <div className={styles.guess}>
        <Input autoFocus maxLength={1} />
        <Button title="Confirmar"/>
      </div>
    </div>
  )
}
