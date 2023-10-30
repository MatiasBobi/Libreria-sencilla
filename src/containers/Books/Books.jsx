import { useEffect, useState, useContext } from 'react'
import './Books.css'
import Cards from '../Cards/Cards'
import AvailableBooksContext from '../../context/BooksAvailable'
import CardsBooksOnHold from '../CardsBooksOnHold/CardsBooksOnHold'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faClose } from '@fortawesome/free-solid-svg-icons'

const Books = () => {
	// Inicialización de estados y consulta a variables de contexto
	const { booksAvailable, onHoldBooks } = useContext(AvailableBooksContext)
	const [pagesAmount, setPagesAmount] = useState(0)
	const [genre, SetGenre] = useState('allbooks')
	const [booksNow, setBooksnow] = useState([])
	const [openModalOnHold, setOpenModalOnHold] = useState(false)

	// Filtra los libros que hay disponibles según el género seleccionado.
	const filterBooksByGenre = (genre, pages) => {
		return booksAvailable.filter(value => {
			return value.book.genre === genre && value.book.pages >= pages
		})
	}

	// Filtra los libros segun la cantidad de paginas seleccionadas en el input.
	const filterBooksByPageAmount = pages => {
		return booksAvailable.filter(value => {
			return value.book.pages >= pages
		})
	}

	// Renderiza los libros que se encuentran en booksNow, o sea libros disponibles sacando los que ya están en espera.
	const renderBooks = () => {
		return booksNow.map((value, index) => {
			return (
				<Cards
					key={index}
					nameBook={value.book.title}
					imgLink={value.book.cover}
				/>
			)
		})
	}
	// Renderiza los libros que se encuentran en onHoldBooks, o sea libros que están en espera.
	const renderBooksOnHold = () => {
		return onHoldBooks.map((value, index) => {
			return (
				<CardsBooksOnHold
					key={index}
					imgLink={value.img}
					nameBook={value.name}
				/>
			)
		})
	}

	// Controla dependiendo de lo seleccionado, sea filtrar por género o por cantidad de páginas, esto siempre afecta a booksNow que es un arreglo que obtiene sus datos de Booksavailable para evitar modificar el array original.
	useEffect(() => {
		if (genre !== 'allbooks') {
			const bookslist = filterBooksByGenre(genre, pagesAmount)
			setBooksnow(bookslist)
			return
		} else if (genre === 'allbooks' && pagesAmount > 0) {
			const bookspageAmount = filterBooksByPageAmount(pagesAmount)
			setBooksnow(bookspageAmount)
			return
		}
		setBooksnow(booksAvailable)
	}, [genre, pagesAmount, booksAvailable])

	return (
		<main>
			<section className='allBooks_container'>
				<section className='books_available_container'>
					<h2>{booksNow.length} Libros disponibles</h2>
					<div>
						<p>En lista de lectura</p>
					</div>
					<div className='inputs_container'>
						<label className='labelinputs' htmlFor='pages'>
							<p>{`Cantidad de paginas: ${pagesAmount}`}</p>
							<input
								onChange={e => setPagesAmount(e.target.value)}
								type='range'
								min={0}
								max={2000}
								step={100}
								id='pages'
							/>
						</label>
						<label className='labelinputs' htmlFor='genre'>
							<p>Filtrar por género</p>
							<select
								defaultValue={'allbooks'}
								onChange={e => SetGenre(e.target.value)}
							>
								<option value='allbooks'>Todos</option>
								<option value='Fantasía'>Fantasía</option>
								<option value='Ciencia ficción'>Ciencia Ficción</option>
								<option value='Terror'>Terror</option>
								<option value='Zombies'>Zombies</option>
							</select>
						</label>
					</div>
					<section className='books_container'>{renderBooks()}</section>
					<div
						className='book_modal_container'
						onClick={() => {
							setOpenModalOnHold(!openModalOnHold)
						}}
					>
						{
							// Dependiendo del valor de la variable openModalOnHold, va a mostrar el icono correspondiente.
							openModalOnHold ? (
								<FontAwesomeIcon className='close_icon' icon={faClose} />
							) : (
								<>
									<span>{onHoldBooks.length}</span>
									<FontAwesomeIcon icon={faBook} />
								</>
							)
						}
					</div>
					<section
						className={`book_onHold_mobile${
							openModalOnHold ? '_open' : '_closed'
						}`}
					>
						<h2>{onHoldBooks.length} Libros en espera</h2>
						<section className='book_onHold_container'>
							{renderBooksOnHold()}
						</section>
					</section>
				</section>
				<section className='book_onHold'>
					<h2>{onHoldBooks.length} Libros en espera</h2>
					<section className='book_onHold_container mobile_off'>
						{renderBooksOnHold()}
					</section>
				</section>
			</section>
		</main>
	)
}

export default Books
