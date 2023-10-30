import { useContext } from 'react'
import './CardsBooksOnHold.css'
import AvailableBooksContext from '../../context/BooksAvailable'

const CardsBooksOnHold = props => {
	// Inicialización de variables.
	const { imgLink, nameBook } = props
	const { deleteBooksOnHold } = useContext(AvailableBooksContext)

	return (
		<div className='book_onhold'>
			<img src={imgLink} alt={nameBook} />
			<button
				onClick={() => {
					deleteBooksOnHold(nameBook)
				}}
			>
				-
			</button>
		</div>
	)
}

export default CardsBooksOnHold
