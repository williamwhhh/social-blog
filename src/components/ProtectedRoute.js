import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
//import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  if (localStorage.getItem('user')) {
    return props.children;
  } else {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    );
  }
};

export default ProtectedRoute;
