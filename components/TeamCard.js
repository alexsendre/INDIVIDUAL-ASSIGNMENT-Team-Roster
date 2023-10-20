import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeam } from '../api/clubData';
import { deleteTeamMembers } from '../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteTeamCard = () => {
    if (window.confirm(`Disband ${teamObj.club_name}?`)) {
      deleteTeam(teamObj.fbK).then(deleteTeamMembers(teamObj.fbK)).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '18rem', margin: '10px', backgroundColor: '#2B2D42', color: 'white',
    }}
    >
      <Card.Img variant="top" src={teamObj.logo} alt={teamObj.team_image} />
      <hr className="team-card" />
      <Card.Body>
        <Card.Title className="text-center">
          {teamObj.club_name}
          <span>{teamObj.favorite ? ' ⭐' : ''}</span>
        </Card.Title>
        <div className="text-center">
          <Link href={`/teams/${teamObj.fbK}`} passHref>
            <Button className="m-2 view-btn">👀</Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
          <Link href={`/teams/edit/${teamObj.fbK}`} passHref>
            <Button className="edit-btn">✍️</Button>
          </Link>
          <Button variant="danger" className="m-2 del-btn" onClick={deleteTeamCard}>
            ❌
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    club_name: PropTypes.string,
    logo: PropTypes.string,
    team_image: PropTypes.string,
    favorite: PropTypes.bool,
    fbK: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
