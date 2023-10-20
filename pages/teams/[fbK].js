/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
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
          <h1 className="text-white">{teamDetails.club_name}</h1>
        </div>
        <div className="d-flex justify-content-center">
          <img src={teamDetails.team_image} alt={teamDetails.logo} style={{ width: '500px' }} />
        </div>
        <br />
      </div>
      <div className="d-flex flex-column">
        <div className="text-center">
          <h3 className="text-white mt-5 text-center">PLAYERS</h3>
          <hr className="text-white mb-3 h-p" />
        </div>
        <div className="d-flex flex-wrap">
          {teamDetails.members?.map((player) => (
            <MemberCard key={player.fbK} memberObj={player} onUpdate={getDetails} />
          ))};
        </div>
      </div>
    </>
  );
}
