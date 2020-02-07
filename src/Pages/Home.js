import React from "react";
import Card from "../Components/Card";
import NavBar from "../Components/Navbar";
import { useContextState } from "../Store";
import Skeleton from "../Components/Skeleton";
import { useFullMovie } from "../Controllers/useMovie";
import Modal from "../Components/Modal";

export default function Home() {
  const { loading, movieID } = useContextState();

  useFullMovie(movieID);

  return (
    <>
      <NavBar />
      <Modal />
      {loading ? <Skeleton /> : <Card />}
    </>
  );
}
