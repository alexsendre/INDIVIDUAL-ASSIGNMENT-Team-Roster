import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
          <img src={playerDetails.image} alt="Player" style={{ width: '400px' }} />
        </div>
        <div className="ms-5 details">
          <h1>{playerDetails.name}</h1>
          <hr className="view-hr" />
          <h3>{playerDetails.role}</h3>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/members/view" passHref>
          <Button size="lg" className="btn-m">Go Back</Button>
        </Link>
      </div>
    </>
  );
}
