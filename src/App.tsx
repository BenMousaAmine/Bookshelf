import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './tabs/home.tsx';
import Library from './tabs/library.tsx';
import Category from './tabs/category.tsx';
import Account from './tabs/account.tsx';
import TabNav from './tabs/tabNav.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/category" element={<Category />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <TabNav />
    </Router>
  );
}

export default App;
