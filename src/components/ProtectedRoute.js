import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  if (localStorage.getItem('email')) {
    console.log(localStorage.getItem('email'));
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
