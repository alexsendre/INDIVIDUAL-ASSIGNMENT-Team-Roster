import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { viewMemberDetails } from '../../api/mergedData';

export default function ViewSingleMember() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();
  const { fbK } = router.query;

  const getDetails = () => {
    viewMemberDetails(fbK).then(setPlayerDetails);
  };

  useEffect(() => {
    getDetails();
  });

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={playerDetails.image} alt="Player" style={{ width: '300px' }} />
        </div>
        <div className="ms-5 details">
          <h1 className="text-white">{playerDetails.name}</h1>
          <h3 className="text-white">{playerDetails.club_name}</h3>
          <h5>{playerDetails.role}</h5>
        </div>
      </div>
    </>
  );
}
