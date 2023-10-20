import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTeam } from '../../../api/clubData';
import NewTeamForm from '../../../components/forms/NewTeamForm';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { fbK } = router.query;

  useEffect(() => {
    getSingleTeam(fbK).then(setEditItem);
  }, [fbK]);

  return (<NewTeamForm obj={editItem} />);
}
