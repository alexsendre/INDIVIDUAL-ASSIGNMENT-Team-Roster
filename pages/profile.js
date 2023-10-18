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
        <h1 className="text-white mt-4 mb-3">{user.displayName}</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.photoURL} alt="User Profile" />
      </div>
      <div>
        <h4 className="text-white mt-5">
          Hey there, thanks for using our app!
          <br />
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
