import { createContext, useEffect, useState } from 'react'
import booksJSON from '../books/books.json'

// Creando el contexto para los libros disponibles
const AvailableBooksContext = createContext([])

const AvailableBooksContextProvider = ({ children }) => {
	// Inicialización de estados
	const { library } = booksJSON
	const [booksAvailable, setBooksAvailable] = useState(library)
	const [onHoldBooks, setOnHoldBooks] = useState(
		JSON.parse(localStorage.getItem('onHold')) || []
	)

	// Función que elimina los libros que se encuentran en espera al tocar el botón en un libro en específico
	const deleteBooksOnHold = data => {
		const updatedOnHoldBooks = onHoldBooks.filter(value => value.name !== data)
		setOnHoldBooks(updatedOnHoldBooks)
		localStorage.setItem('onHold', JSON.stringify(updatedOnHoldBooks))
	}

	// Función que setea un nuevo libro en el arreglo de libro en espera.
	const setDataOnHold = newData => {
		if (Array.isArray(onHoldBooks)) {
			if (onHoldBooks.length > 0) {
				const booksExists = onHoldBooks.filter(
					value => value.name === newData.name
				)
				if (booksExists.length >= 1) {
					return
				}
			}
			onHoldBooks.push(newData)
			setOnHoldBooks([...onHoldBooks])
			localStorage.setItem('onHold', JSON.stringify(onHoldBooks))
		}
	}

	// Controla que libros se encuentran disponibles y cuáles están en espera.
	useEffect(() => {
		const availableBooks = library.filter(value => {
			const isUnavailable = onHoldBooks.find(bk => {
				return bk.name === value.book.title
			})
			return isUnavailable ? null : value
		})
		setBooksAvailable(availableBooks)
	}, [onHoldBooks])

	// Variables y funciones de contexto.
	const data = {
		booksAvailable,
		setBooksAvailable,
		onHoldBooks,
		setOnHoldBooks,
		setDataOnHold,
		deleteBooksOnHold,
	}
	return (
		<AvailableBooksContext.Provider value={data}>
			{children}
		</AvailableBooksContext.Provider>
	)
}

export { AvailableBooksContextProvider }
export default AvailableBooksContext
