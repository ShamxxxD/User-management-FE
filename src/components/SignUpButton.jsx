import { Button } from 'antd';
import { Link } from 'react-router-dom';

function SignUpButton() {
   return (
      <Button>
         <Link to='/auth/register'>Sign Up</Link>
      </Button>
   );
}

export default SignUpButton;
