import { FC, useEffect, useRef, useState } from "react";
import { useDashboard } from "../context/Dashboard";
import Select from "./Select";

const ChangedStatus: FC = () => {
  const { columns } = useDashboard();
  const [id, setId] = useState(-1);
  const [column, setColumn] = useState(columns[0].name);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (id < 0) {
      return;
    }

    const name = "." + column + id;
    const element = document.querySelector(name);
    if (element) {
      // set red background
      (element as any).style.backgroundColor = status ? "green" : "red";
      // set animation
      (element as any).style.animation = "blink 1s linear infinite";      
    }
  }, [id, status]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "400px",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Select
          options={columns.map((column) => column.name)}
          value={column}
          onChange={(e) => {
            console.log(e)
            setColumn(e);
          }}
        />
        <input
          type="text"
          name="id"
          value={id}
          placeholder="ID a cambiar estado"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #222",
          }}
          onChange={(e) => {
            setId(Number(e.target.value));
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            name="status"
            checked={status}
            onChange={(e) => {
              setStatus(e.target.checked);
            }}
          />
          <label
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {status ? "Activo" : "Inactivo"}
          </label>
        </div>
      </form>
    </div>
  );
};

export default ChangedStatus;
