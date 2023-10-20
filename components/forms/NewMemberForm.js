import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';
import { getTeams } from '../../api/clubData';

const initialState = {
  name: '',
  image: '',
  role: '',
  playerNumber: null,
  favorite: false,
  club_id: '',
};

function NewMemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.fbK) setFormInput(obj);
    getTeams(user.uid).then(setTeams);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.fbK) {
      updateMember(formInput).then(() => router.push('/members/view'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { fbK: name };

        updateMember(patchPayload).then(() => {
          router.push('/members/view');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center mt-4">
        {obj.fbK ? 'Update' : 'Add a'} Member
      </h2>

      <Form.Group
        className="mb-3 mt-3"
      >
        <FloatingLabel controlId="floatingInput1" label="Full Name" className="mb-3 f-w f-c">
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group
        className="mb-3"
      >
        <FloatingLabel controlId="floatingInput2" label="Player Image" className="mb-3 f-w f-c">
          <Form.Control
            type="url"
            placeholder="Enter image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group
        className="mb-3"
      >
        <FloatingLabel controlId="floatingInput3" label="Player Club" className="mb-3 f-w f-c">
          <Form.Select
            name="club_id"
            onChange={handleChange}
            value={formInput.club_id}
            required
          >
            <option value="">Select Club</option>
            {
              teams.map((team) => (
                <option
                  key={team.fbK}
                  value={team.fbK}
                >
                  {team.club_name}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group
        className="mb-3 mt-3"
      >
        <FloatingLabel controlId="floatingInput4" label="Select Role" className="mb-3 f-w f-c">
          <Form.Select
            type="text"
            placeholder="Select Role"
            name="role"
            value={formInput.role}
            onChange={handleChange}
            required
          >
            <option value="Forward">Forward</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Defender">Defender</option>
            <option value="Goalkeeper">Goalkeeper</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicCheckbox"
      >
        <Form.Check
          className="f-c"
          type="switch"
          id="favorite"
          name="favorite"
          label="Favorite?"
          checked={formInput.favorite}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              favorite: e.target.checked,
            }));
          }}
        />
      </Form.Group>

      <Form.Group className="text-center">
        <Button className="btn-m" type="submit">
          {obj.fbK ? 'Update' : 'Add'}
        </Button>
      </Form.Group>
    </Form>
  );
}

NewMemberForm.propTypes = {
  obj: PropTypes.shape({
    club_id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    playerNumber: PropTypes.number,
    favorite: PropTypes.bool,
    fbK: PropTypes.string,
  }),
};

NewMemberForm.defaultProps = {
  obj: initialState,
};

export default NewMemberForm;
