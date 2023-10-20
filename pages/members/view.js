import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getMembers } from '../../api/memberData';
import MemberCard from '../../components/MemberCard';
import { useAuth } from '../../utils/context/authContext';

export default function AllMembers() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  });

  return (
    <>
      <h1 className="text-center mt-4">MEMBERS</h1>
      <hr className="hr-m mb-4 w-25" />
      <div className="mt-3 mb-4 text-center">
        <Link href="/members/new" passHref>
          <Button variant="primary" size="md" className="btn-m">Add a Member</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {members.map((member) => (
          <MemberCard key={member.fbK} memberObj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </>
  );
}
