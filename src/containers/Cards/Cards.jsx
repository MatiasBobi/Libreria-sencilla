import { useContext } from 'react'
import './cards.css'
import AvailableBooksContext from '../../context/BooksAvailable'
const Cards = props => {
	// Inicialización de variables.
	const { setDataOnHold } = useContext(AvailableBooksContext)
	const { imgLink, nameBook } = props
	const newData = {
		name: nameBook,
		img: imgLink,
	}

	return (
		<div className='book'>
			<img src={imgLink} alt={nameBook} />
			<button onClick={() => setDataOnHold(newData)}>+</button>
		</div>
	)
}

export default Cards
