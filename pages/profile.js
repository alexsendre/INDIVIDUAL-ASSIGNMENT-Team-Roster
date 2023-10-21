import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="mb-4">
        <h1 className="mt-5 mb-3">{user.displayName}</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.photoURL} alt="User Profile" />
      </div>
      <div>
        <h4 className="mt-5">
          Hey there, thanks for using our app!
          <br />
          Check out <span className="m-cl">the teams</span> or view <span className="tr-cl">the members</span> below!
        </h4>
        <div className="profile-btns mt-4">
          <Button style={{ marginRight: '5px' }} size="lg" className="btn-m" onClick={() => router.push('/teams/view')}>View Teams</Button>
          <Button style={{ marginLeft: '5px' }} size="lg" className="btn-m" onClick={() => router.push('/members/view')}>View Members</Button>
        </div>
      </div>
    </div>
  );
}
