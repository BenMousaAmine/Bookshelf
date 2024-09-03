import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Home from './tabs/home.tsx';
import Library from './tabs/library.tsx';
import Category from './tabs/category.tsx';
import Account from './tabs/account.tsx';
import TabNav from './tabs/tabNav.tsx';
import BookDetail from './book/bookDetail.tsx';
import PdfReader from './book/pdfReader.tsx';
import Login from './auth/login.tsx';
import Aichat from './chat/aichat.tsx';
import SessionProvider from './hooks/SessionContext.tsx';
import Register from './auth/register.tsx';
import PrivateRoute from './component/privateRoute.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/library"
          element={
            <PrivateRoute>
              <Library />
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/book"
          element={
            <PrivateRoute>
              <BookDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/reader/:id"
          element={
            <PrivateRoute>
              <PdfReader />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <SessionProvider>
                <Aichat />
              </SessionProvider>
            </PrivateRoute>
          }
        />
      </Routes>
      <TabNavWithConditionalRendering />
    </Router>
  );
}

const TabNavWithConditionalRendering = () => {
  const location = useLocation();

  if (
    location.pathname.startsWith('/book') ||
    location.pathname.startsWith('/reader') ||
    location.pathname.startsWith('/chat') ||
    location.pathname.startsWith('/login')
  ) {
    return null;
  }

  return <TabNav />;
};

export default App;
