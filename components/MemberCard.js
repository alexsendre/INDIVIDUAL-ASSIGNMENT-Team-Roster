import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMember } from '../api/memberData';

export default function MemberCard({ memberObj, onUpdate }) {
  const deletePlayer = () => {
    if (window.confirm(`Remove ${memberObj.name}?`)) {
      deleteMember(memberObj.fbK).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '18rem', margin: '10px', backgroundColor: '#2B2D42', color: 'white',
    }}
    >
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.playerNumber} />
      <Card.Body>
        <Card.Title className="text-center">
          {memberObj.name}
          <span>{memberObj.favorite ? ' ⭐' : ''}</span>
          <hr className="hr-c" />
          {memberObj.role}
        </Card.Title>
        <div className="text-center">
          <Link href={`/members/${memberObj.fbK}`} passHref>
            <Button className="m-2 view-btn">👀</Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
          <Link href={`/members/edit/${memberObj.fbK}`} passHref>
            <Button className="edit-btn">✍️</Button>
          </Link>
          <Button className="m-2 del-btn" onClick={deletePlayer}>
            ❌
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    fbK: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    favorite: PropTypes.bool,
    playerNumber: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
