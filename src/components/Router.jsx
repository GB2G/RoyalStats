import { Outlet, Link } from 'react-router-dom';
import { HashRouter, Routes, Route} from 'react-router-dom';

import Navbar from './NavBar.jsx';
import Footer from './Footer.jsx';
import FleetComparison from '../pages/Homepage.jsx';
import Prices from '../pages/Prices.jsx';
import Fleet from '../pages/Fleet.jsx';


export default function Router(){
    const Layout = () => {
        return(
            <>
                <Navbar />
                <Outlet />
                <Footer />
            </>
        )
    }

    const BrowserRoutes = () => {

        return(
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<FleetComparison />} />
                        <Route path="/fleet/:language" element={<Fleet />} />
                        <Route path="/prices/:language" element={<Prices />} />
                    </Route>
                </Routes>
            </HashRouter>
        )
    }

    return(
        <BrowserRoutes />
    )
}