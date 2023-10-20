/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});

  const router = useRouter();

  const { fbK } = router.query;

  const getDetails = () => {
    viewTeamDetails(fbK).then(setTeamDetails);
  };

  useEffect(() => {
    getDetails();
  });

  return (
    <>
      <div className="mt-5 text-center">
        <div className="ms-5 mb-5">
          <h1>{teamDetails.club_name}</h1>
          <hr className="mb-3 h-p" />
        </div>
        <div className="d-flex justify-content-center">
          <img src={teamDetails.team_image} alt={teamDetails.logo} style={{ width: '600px' }} />
        </div>
        <br />
      </div>
      <div className="d-flex flex-column">
        <div className="text-center">
          <h3 className="mt-5 text-center">PLAYERS</h3>
          <hr className="mb-3 h-p" />
          <Button size="md" className="btn-m mt-2 mb-4" onClick={() => router.push('/members/new')}>Add Member</Button>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {teamDetails.members?.map((player) => (
            <MemberCard key={player.fbK} memberObj={player} onUpdate={getDetails} />
          ))}
        </div>
      </div>
    </>
  );
}
