import tipIcon from "../../assets/Frame-1.svg"
import styles from "./tip.module.css"

type Props = {
   tip: string
}

export function Tip({ tip } : Props) {
   return (
      <div className={styles.container}>
         <img src={tipIcon} alt="Ícone de dica" />
         <div>
            <h3>Dica</h3>
            <p>{tip}</p>
         </div>
      </div>
   )
}