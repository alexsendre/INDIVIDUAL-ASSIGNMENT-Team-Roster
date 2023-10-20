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
      <h1 style={{ color: 'black' }}>Welcome, <span className="user-greet">{user.displayName}</span> </h1>
      <div>
        <h4 style={{ color: 'black' }} className="mt-2">
          Check out <span className="m-cl">the teams</span> or check out <span className="tr-cl">our members</span> below!
        </h4>
        <div className="profile-btns mt-4">
          <Button style={{ marginRight: '5px' }} size="lg" className="btn-m" onClick={() => router.push('/teams/view')}>View Teams</Button>
          <Button style={{ marginLeft: '5px' }} size="lg" className="btn-m" onClick={() => router.push('/members/view')}>View Members</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
