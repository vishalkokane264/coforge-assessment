import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

// const fetchCharacter = async (id: string): Promise<ICharacter> => {
//   console.log("getting detailed data", id);
//   const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch character");
//   return res.json();
// };

export const CharacterDetails = () => {
  //   const params = useParams({ from: "/character/:id" });
  //   const id = params.id;

  //   const { data, isLoading, error } = useQuery<ICharacter>({
  //     queryKey: ["character", id],
  //     queryFn: () => fetchCharacter(id!),
  //     enabled: Boolean(id),
  //   });
  //   useEffect(() => {
  //     console.log("Character details data", id);
  //   }, [id]);

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error || !data) return <div>Error loading character.</div>;

  return (
    <div>
      hello details page
      {/* <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <ul>
        <li>Status: {data.status}</li>
        <li>Species: {data.species}</li>
        <li>Gender: {data.gender}</li>
      </ul> */}
    </div>
  );
};

export default CharacterDetails;
