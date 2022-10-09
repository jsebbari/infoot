import Link from 'next/link'
import styles from './Navbar.module.css'
import ThemeButton from '../ThemeButton'
import Logo from '../Logo'
import { ImHome } from "react-icons/im";


export default function Navbar() {

  const homeIcon = <ImHome size={30}/>


  return (
   <nav className={styles.navbar}>
    <Logo/>
    <ul>
       <li><Link href="/">{homeIcon}</Link></li> 
        <li><Link href="/articles">Actualités</Link></li>
        <li><Link href="/">About</Link></li>
        <li><ThemeButton/></li>
    </ul>
   </nav>
  )
}
