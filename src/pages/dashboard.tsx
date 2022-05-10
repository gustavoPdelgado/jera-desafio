import Image from 'next/image';
import Router from 'next/router';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      Router.push('/');
    }
  });

  return (
    <>
      <h1>Dashboard KEKW</h1>
      {user ? (
        <>
          <h2>{user?.displayName}</h2>
          <Image
            style={{
              borderRadius: '50%',
            }}
            src={user?.photoURL || '/'}
            width={256}
            height={256}
          />
        </>
      ) : (
        <h1>Sem usuário</h1>
      )}

      <button onClick={() => signOut()}>Sair</button>
    </>
  );
};

export default Dashboard;
