import './App.css';
import {Navbar} from './components/Navbar'
import {Alert} from './components/Alert.js'
import {Home} from './components/Home'
import {About} from './components/About'
import NoteState from './context/notes/NoteState';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

function App() {
    return (
        <NoteState>
            <Router>
                {/*useLocation Hook only useable under Router tag hence Navbar is here*/}
                <Navbar/>
                <Alert msg={"Hello This is great"}/>
                <main className={"container"}>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Home/>
                            </>
                        }>
                        </Route>
                        <Route path="/about" element={
                            <>
                                <About/>
                            </>
                        }>

                        </Route>
                    </Routes>
                </main>
            </Router>
        </NoteState>
    );
}

export default App;
