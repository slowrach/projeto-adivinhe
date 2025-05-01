import styles from "./app.module.css"
import { Header } from "./components/Header/header"
import { Tip } from "./components/Tip/tip"

export function App() {
  function restart() {
    alert("oi")
  }

  return (
    <div className={styles.container}>
      <Header current={5} max={10} onRestart={restart}/>
      
      <Tip tip="Exemplo de dica"/>
    </div>
  )
}
