import { FC } from "react";
import { useDashboard } from "../context/Dashboard";
import ChangedStatus from "./ChangedStatus";
import Select from "./Select";

const Header: FC = () => {
  const { simultaneouslyScrolling, setSimultaneouslyScrolling, columns } =
    useDashboard();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-between",
        padding: "0px 20px",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              margin: 0,
            }}
          >
            Tablero
          </h2>
          <h3
            style={{
              margin: "0px 0px 20px 0px",
            }}
          >
            Scroll simultáneo
          </h3>
        </div>
        <span>
          <strong>Notas:</strong> <br />
          Para que las columnas se sincronicen, debes activar el check y
          mantener el cursor sobre la columna que quieres sincronizar.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          checked={simultaneouslyScrolling}
          onChange={(e) => {
            setSimultaneouslyScrolling(e.target.checked);
          }}
        />
        <label>Scroll simultáneo</label>
      </div>
     <ChangedStatus/>
    </div>
  );
};

export default Header;
