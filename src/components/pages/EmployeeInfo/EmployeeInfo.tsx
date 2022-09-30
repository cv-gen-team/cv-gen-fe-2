import { FC, useEffect } from 'react';
import { PersonalInformation } from '@pages/EmployeeInfo/components/PersonalInformation';
import { Button, Divider } from '@mui/material';
import { WrapRow } from '@atoms/wrap-row';
import { SkillsInfo } from '@pages/EmployeeInfo/components/SkillsInfo';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '@api/user/queries';
import { Loader } from '@atoms/loader/loader';
import { LanguagesInfo } from '@pages/EmployeeInfo/components/LanguagesInfo';
import { userStore } from '@store/UserStore';
import { PageHeaderStore } from '@store/PageHeaderStore/PageHeaderStore';

const EmployeeInfo: FC = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: id }
  });
  useEffect(() => {
    PageHeaderStore.setPageInfo({ header: 'Employees', description: "Employee's details" });
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PersonalInformation user={data.user} />

      {!!data.user.profile.skills.length && (
        <>
          <Divider />
          <SkillsInfo skills={data.user.profile.skills} />
        </>
      )}

      {!!data.user.profile.languages.length && (
        <>
          <Divider />
          <LanguagesInfo languages={data.user.profile.languages} />
        </>
      )}

      {(userStore.user$?.role === 'admin' || userStore.user$?.id === data.user.id) && (
        <WrapRow>
          <Button color="primary">Edit</Button>
        </WrapRow>
      )}
    </>
  );
};

export default EmployeeInfo;
