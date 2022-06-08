import './App.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Notification from './components/Notification';
import Messages from './components/Messages';
import Bookmarks from './components/Bookmarks';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/notification" exact element={<Notification />} />
        <Route path="/messages" exact element={<Messages />} />
        <Route path="/bookmarks" exact element={<Bookmarks />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
