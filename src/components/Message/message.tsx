import styles from "./message.module.css"
import cancel from "../../assets/cancel.png"
type Props = {
   message: string
   clear: () => void
}

export function Message({ message, clear } : Props) {
   return (
      <div className={styles.bg}>
         <div className={styles.container}>
            <button type="button" onClick={clear}>
               <img src={cancel} alt="Ícone de fechar aba" />
            </button>
            <h3>{message}</h3>
         </div>
      </div>
   )
}