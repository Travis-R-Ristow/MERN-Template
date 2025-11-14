import classnames from 'classnames';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../Home/NavBar';
import { CreateUserProps, LoginCredsProps, createUser, loginPost } from '../api/User';
import {
  BasicWrapper,
  Description,
  Input,
  LoginButton,
  PostIt,
  TitleWrapper,
  Wrapper
} from './styles';
import { ToastTypes, pushToast } from '../Global/myToaster';
import { theme } from '../Theme';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/g;

const isCompleteForm = (obj: CreateUserProps) => {
  const result = Object.entries(obj).find(([_, value]) => !value);
  return !result ?? false;
};

export const LogIn = () => {
  const [createForm, setCreateForm] = useState<CreateUserProps>({
    email: '',
    psw: '',
    confPsw: '',
    displayName: ''
  });
  const [loginForm, setLoginForm] = useState<LoginCredsProps>({ email: '', psw: '' });

  const navigator = useNavigate();

  const { mutate: handleCreateUser, isPending: createUserIsPending } = useMutation({
    mutationFn: createUser,
    onError: (err) => {
      console.log(err);
      pushToast('Failed to create account', ToastTypes.error);
    },
    onSuccess: (res) => {
      sessionStorage.setItem('accessToken', res.data.token);
      pushToast('Account created');
      navigator('/userpage', { state: res.data });
    }
  });

  const handleLoginUser = useMutation({
    mutationFn: loginPost,
    onError: (err) => {
      console.log(err);
      pushToast('Failed to Login', ToastTypes.error);
    },
    onSuccess: (res) => {
      sessionStorage.setItem('accessToken', res.data.token);
      pushToast('Login successful');
      navigator('/userpage', { state: res.data });
    }
  });

  const handleEnterForm = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      handleLoginUser.mutate(loginForm);
    }
  };

  return (
    <>
      <NavBar navItem='LogIn' />
      <Wrapper>
        <PostIt>
          <TitleWrapper>Log In</TitleWrapper>
          <BasicWrapper onKeyDown={handleEnterForm}>
            <Input
              onChange={({ target: { value } }) => setLoginForm({ ...loginForm, email: value })}
              className={classnames({
                green: !!loginForm.email.match(EMAIL_REGEX),
                red: !!loginForm.email.length ? !loginForm.email.match(EMAIL_REGEX) : false
              })}
              placeholder='email@email.com'
              type='email'
              name='email'
              autoComplete='email'
            />
            <Input
              onChange={({ target: { value } }) => setLoginForm({ ...loginForm, psw: value })}
              className={classnames({ green: !!loginForm.psw?.length })}
              placeholder='Password'
              type='password'
              name='password'
              autoComplete='current-password'
            />
            <LoginButton
              disabled={!loginForm.email.match(EMAIL_REGEX) || !loginForm.psw?.length}
              onClick={() => handleLoginUser.mutate(loginForm)}
            >
              Log In
            </LoginButton>
          </BasicWrapper>
        </PostIt>
        <PostIt
          style={{ backgroundColor: theme.postIt.blue, marginTop: '1rem', marginBottom: '2rem' }}
        >
          <TitleWrapper>Create Account</TitleWrapper>
          <Description>Create an account to write and manage all your jokes.</Description>
          <Description>
            Create ownership over your jokes and get positive feedback from the community.
          </Description>
          <Description style={{ marginBottom: '0.5rem' }}>
            You can post jokes under your account or anonymously.
          </Description>
          <BasicWrapper>
            <Input
              className={classnames({
                green: !!createForm.email.match(EMAIL_REGEX),
                red: !!createForm.email.length ? !createForm.email.match(EMAIL_REGEX) : false
              })}
              onChange={({ target: { value } }) => setCreateForm({ ...createForm, email: value })}
              value={createForm.email}
              placeholder='email@email.com'
              type='email'
              name='email'
              autoComplete='email'
            />
            <Input
              className={classnames({
                green:
                  !!createForm.psw && !!createForm.confPsw
                    ? createForm.psw === createForm.confPsw
                    : false,
                red:
                  !!createForm.psw && !!createForm.confPsw
                    ? createForm.psw !== createForm.confPsw
                    : false
              })}
              onChange={({ target: { value } }) => setCreateForm({ ...createForm, psw: value })}
              placeholder='Password'
              type='password'
              name='password'
              autoComplete='new-password'
            />
            <Input
              className={classnames({
                green:
                  !!createForm.psw && !!createForm.confPsw
                    ? createForm.psw === createForm.confPsw
                    : false,
                red:
                  !!createForm.psw && !!createForm.confPsw
                    ? createForm.psw !== createForm.confPsw
                    : false
              })}
              onChange={({ target: { value } }) => setCreateForm({ ...createForm, confPsw: value })}
              placeholder='Confirm Password'
              type='password'
              name='ConfirmPassword'
              autoComplete='confirm-new-password'
            />
            <Input
              className={classnames({
                green: !!createForm.displayName,
                red: createForm.displayName?.toLocaleLowerCase() === 'buddy'
              })}
              onChange={({ target: { value } }) =>
                setCreateForm({ ...createForm, displayName: value })
              }
              placeholder='Display Name'
              style={{ width: '40%', margin: '0.5rem auto auto auto' }}
              name='DisplayName'
            />

            <LoginButton
              disabled={
                !createForm.email.match(EMAIL_REGEX) ||
                createForm.psw !== createForm.confPsw ||
                !isCompleteForm(createForm) ||
                createUserIsPending
              }
              onClick={() => handleCreateUser(createForm)}
            >
              {createUserIsPending ? ' Loading' : 'Create User'}
            </LoginButton>
          </BasicWrapper>
        </PostIt>
      </Wrapper>
    </>
  );
};
