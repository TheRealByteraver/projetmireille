'use client';
import Input from '@/components/ui/Input';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/services/users';
import { useEffect } from 'react';
import useAlert from '@/hooks/useAlert';
import useCurrentUser from '@/hooks/useCurrentUser';

type FormValues = {
  username: string;
  password: string;
};

const Login = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // AUTH
  const [_, setCurrentUser] = useCurrentUser();

  // RHF
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { /* errors, */ isSubmitted },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // RQ
  const { data: user, isLoading, isError, isSuccess } = useUser(getValues(), isSubmitted);

  // HOOKS
  const [alert, setAlert] = useAlert();

  // EFFECTS
  useEffect(() => {
    if (isSuccess) {
      // check if login was successful
      if (user.firstName !== undefined && user.lastName !== undefined && user.username !== undefined) {
        setCurrentUser(user, getValues());
        router.push('/');
      } else {
        setAlert({ message: user?.message || 'Identifiants incorrects', alertType: 'error' });
        reset();
      }
    }
    if (isError) {
      setAlert({ message: user?.message || 'Un problème est survenu, reessayer plus tard', alertType: 'error' });
    }
  }, [isError, isSuccess, router, setAlert, user, getValues, setCurrentUser, reset]);

  // METHODS
  const onSubmit: SubmitHandler<FormValues> = (/* formValues */) => {
    // console.log('FormValues', formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4 p-4">
      {alert}
      <h1>Connectez-vous à votre compte</h1>
      <div>
        <label htmlFor="username" className="mb-1 text-sm font-bold">
          Nom d&apos;utilisateur
        </label>
        <Input type="text" autoComplete="username" placeholder="Nom d'utilisateur" {...register('username')} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 text-sm font-bold">
          Mot de passe
        </label>
        <Input type="password" autoComplete="current-password" placeholder="Mot de passe" {...register('password')} />
      </div>
      <div className="mt-2 flex flex-row justify-between">
        <Button onClick={() => router.push('/')}>Retour à l&apos;accueil</Button>
        <Button color="indigo" type="submit" disabled={isLoading}>
          Se connecter
        </Button>
      </div>
    </form>
  );
};

export default Login;
