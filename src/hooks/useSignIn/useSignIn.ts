import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ISignInDataForm } from '@pages/SignIn/SignIn.interface';
import { LOGIN } from '@api/auth/queries';
import { userStore } from '@store/UserStore';
import { ToastStore } from '@store/toastStore/ToastsStore';
import { SeverityEnum } from '@store/toastStore/ToastsStore.type';
import { useNavigate } from 'react-router-dom';
import { PathEnum } from '@templates/router/router.types';

export const useSignIn = () => {
  const { data, error, loading, refetch } = useQuery(LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      userStore.setUser(data.login.user);
      userStore.setToken(data.login.access_token);
      localStorage.setItem('user', JSON.stringify(data.login.user));
      localStorage.setItem('token', JSON.stringify(data.login.access_token));
      navigate(`/${PathEnum.employees}`);
    }
  }, [data, error]);
  const onSubmit: SubmitHandler<ISignInDataForm> = ({ email, password }) => {
    refetch({
      auth: { email, password }
    }).catch((error) => ToastStore.addToast(SeverityEnum.error, error.message));
  };
  return { onSubmit, error, loading };
};
