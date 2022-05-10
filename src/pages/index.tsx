import type { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

type FormValues = {
  email: string;
  password: string;
};

const Home: NextPage = () => {
  const { handleSubmit, register } = useForm<FormValues>();
  const { signIn, user, signInWithEmailAndPassword } = useAuth();

  useEffect(() => {
    if (user) {
      Router.push('/dashboard');
    }
  });

  const handleLoginSubmit: SubmitHandler<FormValues> = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  console.log('user', user);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <h1>Vamo loga tiu</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '250px',
          marginBottom: '20px',
        }}
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <input
          type="email"
          {...register('email', { required: true })}
          placeholder="Email"
        />
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </form>
      <button onClick={() => signIn()}>Entrar com Github</button>
      <button onClick={() => Router.push('/register')}>Cadastrar-se</button>
    </div>
  );
};

export default Home;