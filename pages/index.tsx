import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import  Billboard  from "@/components/Billboard";
import MovieList from '@/components/MovieList';
import  Navbar from '@/components/Navbar' ;
import InfoModal from '@/components/InfoModal';
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";


export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);

  if (!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
return {
  props: {}
};
}

export default function Home() {
const { data: movies = []} = useMovieList();
const { data: favorites = [] } = useFavorites();
const {isOpen, closeModal} = useInfoModal();

return (

    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>

);
};

