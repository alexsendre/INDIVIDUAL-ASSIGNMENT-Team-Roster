import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center text-white"
      style={{
        height: '50vh',
        padding: '30px',
        maxWidth: '750px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome, {user.displayName} </h1>
      <div>
        <h4 className="text-white">
          Create a <span className="m-cl">new member</span> or check out <span className="tr-cl">the roster</span> below!
        </h4>
        <div className="profile-btns mt-4">
          <Button style={{ marginRight: '5px' }} size="lg" variant="primary" onClick={() => router.push('/members/view')}>View Members</Button>
          <Button style={{ marginLeft: '5px' }} size="lg" variant="success" onClick={() => router.push('/members/new')}>Add Members</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
