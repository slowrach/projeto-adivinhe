import styles from "./message.module.css"

type Props = {
   message: string
   clear: () => void
}

export function Message({ message, clear } : Props) {
   return (
      <div className={styles.bg}>
         <div className={styles.container}>
            <button type="button" onClick={clear}>
               <img src="src/assets/cancel.png" alt="Ícone de fechar aba" />
            </button>
            <h3>{message}</h3>
         </div>
      </div>
   )
}