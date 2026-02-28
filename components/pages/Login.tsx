'use client';
import Input from '@/components/ui/Input';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/services/users';
import { useEffect } from 'react';
import Alert from '../ui/Alert';
import useAlert from '@/hooks/useAlert';

type FormValues = {
  username: string;
  password: string;
};

const Login = (): React.JSX.Element => {
  // ROUTER
  const router = useRouter();

  // RHF
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitted },
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

  console.log('User:', user, 'isLoading:', isLoading, 'isError:', isError);
  //   console.log('IsSubmitted:', isSubmitted);
  //   console.log('IsSuccess:', isSuccess);

  // EFFECTS
  useEffect(() => {
    if (isSuccess) {
      // check if login was successful
      if (user.firstName !== undefined && user.lastName !== undefined && user.username !== undefined) {
        router.push('/');
      } else {
        setAlert({ message: user?.message || 'Identifiants incorrects', alertType: 'error' });
      }
    }
  }, [isSuccess, router, setAlert, user]);

  // METHODS
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('FormValues', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4 p-4">
      {alert}
      <h1>Connectez-vous à votre compte</h1>
      <div>
        <label htmlFor="username" className="mb-1 text-sm font-bold">
          Nom d&apos;utilisateur
        </label>
        <Input type="text" placeholder="Nom d'utilisateur" {...register('username')} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 text-sm font-bold">
          Mot de passe
        </label>
        <Input type="password" placeholder="Mot de passe" {...register('password')} />
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
