import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route ,Routes} from 'react-router-dom';
import HomePage from './page/HomePage/Home';
import TopNavbar from './component/TopNavbar/TopNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './page/ProductPage/Product'
import Footer from './component/Footer/Footer'

function App() {
  return (
   <>
    <TopNavbar/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<Product />} />

    </Routes>
    </BrowserRouter>

    <Footer/>
   </>
  );
}

export default App;
