import './App.css';
import 'antd/dist/antd.min.css';
import { Button, Result } from 'antd';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Notification from './components/Notification';
import Messages from './components/Messages';
import Bookmarks from './components/Bookmarks';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import EnlargedPost from './components/EnlargedPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route
          path="/home"
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          exact
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          exact
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          exact
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          exact
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:postId"
          exact
          element={
            <ProtectedRoute>
              <EnlargedPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to="/">
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
