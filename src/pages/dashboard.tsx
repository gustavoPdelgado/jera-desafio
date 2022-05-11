import { realpath } from 'fs';
import { delBasePath } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import firebase from '../config/firebaseClient';
import useAuth from '../hooks/useAuth';
import { getLatestMovies } from '../services/tmdbAPI';

type Inputs = {
  nomeFilme: string;
  nota: number;
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { handleSubmit, register } = useForm<Inputs>();
  const [data, setData] = useState(null as any);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user) {
      const db = firebase.firestore();
      db.collection('notas')
        .where('userId', '==', user?.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
          });
          console.log(querySnapshot);
        });
    }
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await getLatestMovies();

      setMovies(movies.results);
    };

    getMovies();
  }, []);

  const formHandler: SubmitHandler<Inputs> = (data) => {
    const db = firebase.firestore();

    db.collection('notas')
      .add({
        nomeFilme: data.nomeFilme,
        nota: data.nota,
        userId: user?.uid,
      })
      .then((docRef) => {
        console.log('Document written ID: ' + docRef.id);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(data);
    setData(data);
  };

  return (
    <>
      <Head>
        <title>Metflix - Dashboard</title>
      </Head>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 4px 4px 12px',
        }}
      >
        <div>Dashboard KEKW</div>
        {user ? (
          <>
            <div
              style={{
                display: 'flex',
              }}
            >
              {user.photoURL ? (
                <Image
                  style={{
                    borderRadius: '50%',
                  }}
                  src={user?.photoURL || '/'}
                  width={64}
                  height={64}
                />
              ) : (
                ''
              )}

              <button onClick={() => signOut()}>Sair</button>
            </div>
          </>
        ) : (
          <h1>Sem usuário .,.</h1>
        )}
      </div>

      {/* <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '240px',
          }}
          onSubmit={handleSubmit(formHandler)}
        >
          <input type="text" {...register('nomeFilme')} />
          <input type="number" {...register('nota', { max: 5, min: 1 })} />
          <input type="submit" value="Enviar" />
        </form>
      </div> */}

      {}
      <div
        style={{
          display: 'grid',
          width: '100%',
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(auto-fill, 250px)',
          gap: '8px',
          marginTop: '12px',
        }}
      >
        {movies.map((movie: any) => (
          <div
            style={{
              borderBottom: '1px solid rgba(0,0,0, 0.1)',
              width: '250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Image
              src={'https://image.tmdb.org/t/p/original' + movie.poster_path}
              width={200}
              height={300}
              layout="fixed"
            ></Image>
            <span>{movie.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
