import { useQuery } from "@tanstack/react-query";
import { useRouter, Link, Outlet } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useEffect, useState } from "react";

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}

export default function CharacterList() {
  const fetchCharacters = async (page: number): Promise<ApiResponse> => {
    console.log("fetching new records");
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  const columns: any = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info: any) => (
        <Link to={`/character/${info.row.original.id}`}>{info.getValue()}</Link>
      ),
    },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "species", header: "Species" },
    { accessorKey: "gender", header: "Gender" },
  ];

  const router = useRouter();
  const search = router.state.location.search as Record<string, string>;
  const [page, setPage] = useState(Number(search.page) || 1);

  useEffect(() => {
    const search = router.state.location.search as Record<string, string>;
    setPage(Number(search.page) || 1); // Update page state on route change
  }, [router.state.location.search]);

  const { data, isLoading, error, refetch } = useQuery<ApiResponse>({
    queryKey: ["characters", router.state.location.pathname, page],
    queryFn: () => fetchCharacters(page),
    placeholderData: (prev) => prev,
  });

  const table = useReactTable({
    data: data && "results" in data ? data.results : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (newPage: number) => {
    router.navigate({
      to: "/character",
      search: { page: String(newPage) },
    });
    setPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading characters.</div>;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : (header.column.columnDef.header as string)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              style={{ cursor: "pointer" }}
              onClick={() =>
                router.navigate({
                  to: `/character/details?id=${row.original.id}`,
                })
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderValue() as React.ReactNode}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "1rem" }}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {page} of {data && "info" in data ? data.info.pages : 1}
        </span>
        <button
          disabled={data && "info" in data ? page === data.info.pages : true}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
      <Outlet />
    </div>
  );
}
