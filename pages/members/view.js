import React, { useEffect, useState } from 'react';
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
      <h1 className="text-center mt-4 mb-4 text-white">TEAM</h1>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.fbK} memberObj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </>
  );
}
