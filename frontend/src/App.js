// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App my-4">
         <h1 className='text-center'>Qurilo Solutions</h1>
         <div>
          <Form/>
         </div>
    </div>
  );
}

export default App;
