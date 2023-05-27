import './App.css';
import Header from './components/Header'
import Content from './components/Content'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<div className="App">
			<Header/>
			<Content/>
			<ToastContainer/>
		</div>
	);
}

export default App;
