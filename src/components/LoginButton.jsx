import { Button } from 'antd';
import { Link } from 'react-router-dom';

function LoginButton() {
   return (
      <Button>
         <Link to='/auth/login'>Login</Link>
      </Button>
   );
}

export default LoginButton;
