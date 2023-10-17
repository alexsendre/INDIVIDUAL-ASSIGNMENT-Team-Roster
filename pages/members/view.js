import React, { useEffect, useState } from 'react';
import { getMembers } from '../../api/memberData';
import MemberCard from '../../components/MemberCard';
import { useAuth } from '../../utils/context/authContext';

export default function ViewMembers() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  });

  return (
    <div className="d-flex flex-wrap">
      {members.map((member) => (
        <MemberCard key={member.fbK} memberObj={member} onUpdate={getAllMembers} />
      ))}
    </div>
  );
}
