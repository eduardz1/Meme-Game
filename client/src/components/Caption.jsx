import Button from "react-bootstrap/Button";
import { useQuery } from "@tanstack/react-query";

const Caption = () => {
  const { data, status, error } = useQuery({
    queryKey: ["films"],
    queryFn: () =>
      fetch("https://swapi.dev/api/films/").then((res) => res.json()),
  });

  if (status === "pending") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error :(</p>;
  }

  return (
    <div className="d-grid gap-2">
      <Button variant="info" size="lg">
        Caption
      </Button>
    </div>
  );
};

export default Caption;

// import React from 'react'
// import { Typography, Link } from '@mui/material'
// import { Link as RouterLink } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'

// export default function Films(props) {
//     const { data, status, error } = useQuery({
//       queryKey: ['films'],
//       queryFn: () => fetch('https://swapi.dev/api/films/').then((res) => res.json()),
//     })

//     if (status === 'pending') {
//       return <p>Loading...</p>
//     }
//     if (status === 'error') {
//       return <p>Error :(</p>
//     }

//     return (
//       <div>
//         <Typography variant="h2">Films</Typography>
//         {data.results.map((film) => {
//           const filmUrlParts = film.url.split('/').filter(Boolean)
//           const filmId = filmUrlParts[filmUrlParts.length - 1]
//           return (
//             <article key={filmId}>
//               <Link component={RouterLink} to={`/films/${filmId}`}>
//                 <Typography variant="h6">
//                   {film.episode_id}. {film.title}{' '}
//                   <em>
//                     ({new Date(Date.parse(film.release_date)).getFullYear()})
//                   </em>
//                 </Typography>
//               </Link>
//             </article>
//           )
//         })}
//       </div>
//     )
//   }
