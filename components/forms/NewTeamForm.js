import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/clubData';

const initialState = {
  club_name: '',
  logo: '',
  team_image: '',
  favorite: false,
};

function NewTeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.fbK) setFormInput(obj);
  }, [obj]);

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
      updateTeam(formInput).then(() => router.push('/teams/view'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { fbK: name };

        updateTeam(patchPayload).then(() => {
          router.push('/teams/view');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <h2 className=" text-center mt-4">
        {obj.fbK ? 'Update' : 'Add a'} Club
      </h2>

      <Form.Group
        className="mb-3 mt-3"
      >
        <FloatingLabel controlId="floatingInput1" label="Club Name" className="mb-3 f-w f-c">
          <Form.Control
            type="text"
            placeholder="Enter Club Name"
            name="club_name"
            value={formInput.club_name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group
        className="mb-3"
      >
        <FloatingLabel controlId="floatingInput4" label="Club Logo" className="mb-3 f-w f-c">
          <Form.Control
            type="url"
            placeholder="Enter Club Logo URL"
            name="logo"
            value={formInput.logo}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group
        className="mb-3"
      >
        <FloatingLabel controlId="floatingInput4" label="Team Image" className="mb-3 f-w f-c">
          <Form.Control
            type="url"
            placeholder="Enter Team Image URL"
            name="team_image"
            value={formInput.team_image}
            onChange={handleChange}
            required
          />
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

NewTeamForm.propTypes = {
  obj: PropTypes.shape({
    club_name: PropTypes.string,
    logo: PropTypes.string,
    team_image: PropTypes.string,
    favorite: PropTypes.bool,
    fbK: PropTypes.string,
  }),
};

NewTeamForm.defaultProps = {
  obj: initialState,
};

export default NewTeamForm;
