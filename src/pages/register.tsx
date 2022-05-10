import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

type FormValues = {
  email: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { signUp } = useAuth();

  const handleRegisterSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);

    signUp(data.email, data.password);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <input type="email" {...register('email')} placeholder="Email" />
        <input type="password" {...register('password')} placeholder="Senha" />
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};

export default Register;
