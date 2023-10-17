import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function MemberCard({ memberObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.playerNumber} />
      <Card.Body>
        <Card.Title className="text-center">{memberObj.name} <br />{memberObj.playerNumber}</Card.Title>
        <div className="text-center">
          <Link href={`/members/${memberObj.fbK}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
          <Link href={`/members/edit/${memberObj.fbK}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" className="m-2">
            BYEE
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
};
