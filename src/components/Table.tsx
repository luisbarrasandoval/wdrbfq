import { FC } from "react";
import { useDashboard } from "../context/Dashboard";
import { useQueries } from "@tanstack/react-query";

const randomUUID = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const Table: FC = () => {
  const { columns } = useDashboard();
  const result = useQueries({
    queries: columns.map(({ name, url }) => {
      return {
        queryKey: [name],
        queryFn: async () => {
          return (await fetch(url)).json();
        },
      };
    }),
  });

  return (
    <div
  
    >
      <table
        style={{
          marginTop: 20,
          overflow: "scroll",
          display: "block",
          background: "#222",
          color: "#fff",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
      >
        <thead>
          <tr>
            <th colSpan={columns.length}>
              Datos de las {columns.length} columnas juntos
            </th>
          </tr>
          <tr>
            {columns.map(({ name }) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result?.[0]?.data?.map((_: any, i: number) => (
            <tr key={randomUUID()}>
              {result?.map(({ data }) => (
                <td
                  style={{
                    padding: 5,
                    background: columns?.[i % columns.length]?.backgroundColor,
                  }}
                  key={randomUUID()}
                >
                  {data?.[i]?.title || data?.[i]?.body}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
