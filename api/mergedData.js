import { deleteTeam, getSingleTeam, getTeamMembers } from './clubData';
import { deleteMember, getSingleMember } from './memberData';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObj) => {
      getSingleTeam(memberObj.club_id)
        .then((teamObj) => {
          resolve({ teamObj, ...memberObj });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamMembers(teamFirebaseKey)])
    .then(([teamObj, teamMemberArray]) => {
      resolve({ ...teamObj, members: teamMemberArray });
    }).catch((error) => reject(error));
});

const deleteTeamMembers = (memberId) => new Promise((resolve, reject) => {
  getTeamMembers(memberId).then((memberArr) => {
    const deleteMembersPromises = memberArr.map((member) => deleteMember(member.fbK));

    Promise.all(deleteMembersPromises).then(() => {
      deleteTeam(memberId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewMemberDetails,
  viewTeamDetails,
  deleteTeamMembers,
};
