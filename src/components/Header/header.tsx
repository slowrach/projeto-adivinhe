import logo from "../../assets/logo.jpg"
import restart from "../../assets/Frame.svg"
import styles from "../Header/header.module.css"

type Props = {
   current: number
   max: number
   onRestart: () => void
}

export function Header({ current, max, onRestart} : Props) {
   return <div className={styles.container}>
      <img src={logo} alt="Logo" className={styles.img}/>

      <header className={styles.header}>
         <span>
            <strong>{current}</strong> de {max} tentativas
         </span>

         <button type="button" onClick={onRestart}>
            <img src={restart} alt="Botão de reiniciar o jogo" />
         </button>
      </header>
   </div>
}