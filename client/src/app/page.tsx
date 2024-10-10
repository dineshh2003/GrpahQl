"use client";

import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

export default function Home() {
  // Set the initial state as either `null` or `string`
  const [response, setResponse] = useState<string | null>(null);
  const { data, loading } = useQuery(query);

  useEffect(() => {
    if (data) {
      setResponse(JSON.stringify(data, null, 2)); // Convert data to a formatted string
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div>
      {/* Render the response if it's available */}
      <pre>{response}</pre>
    </div>
  );
}
