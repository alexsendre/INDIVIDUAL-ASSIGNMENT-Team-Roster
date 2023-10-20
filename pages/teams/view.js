import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTeams } from '../../api/clubData';
import { useAuth } from '../../utils/context/authContext';
import TeamCard from '../../components/TeamCard';

export default function AllTeams() {
  const [teams, setTeams] = useState([]);

  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  });

  return (
    <>
      <h1 className="text-center mt-4">TEAMS</h1>
      <hr className="hr-m mb-4 w-10" />
      <div className="mt-3 mb-4 text-center">
        <Link href="/teams/new" passHref>
          <Button variant="primary" size="md" className="btn-m">Add a Team</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {teams?.map((team) => (
          <TeamCard key={team.fbK} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </>
  );
}
