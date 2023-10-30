import './App.css'
import Books from './containers/Books/Books'
import { AvailableBooksContextProvider } from './context/BooksAvailable'

function App() {
	return (
		<main>
			<AvailableBooksContextProvider>
				<Books />
			</AvailableBooksContextProvider>
		</main>
	)
}

export default App
