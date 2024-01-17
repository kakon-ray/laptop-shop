import './App.css';
import { BrowserRouter,Route ,Routes} from 'react-router-dom';
import HomePage from './page/HomePage/Home';
import TopNavbar from './component/TopNavbar/TopNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Shop from './page/ShopPage/Shop'
import Footer from './component/Footer/Footer'

function App() {
  return (
   <>
    <TopNavbar/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<Shop/>} />

    </Routes>
    </BrowserRouter>

    <Footer/>
   </>
  );
}

export default App;
