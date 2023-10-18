import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleMember } from '../../../api/memberData';
import NewMemberForm from '../../../components/forms/NewForm';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { fbK } = router.query;

  useEffect(() => {
    getSingleMember(fbK).then(setEditItem);
  }, [fbK]);

  return (<NewMemberForm obj={editItem} />);
}
