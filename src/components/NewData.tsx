import { FC, useState } from "react";
import Modal from "./Modal";

export type NewDataProps = {
  column: string;
  open: boolean;
  onSaved: (data: any) => void;
  onClosed: () => void;
};

const NewData: FC<NewDataProps> = ({
  open,
  column,
  onSaved,
  onClosed,
}) => {
  const [data, setData] = useState({
    id: Math.random() * 1000 + Math.random(),
    title: "",
  });

  return (
    <Modal open={open} onClose={onClosed}>
      <div style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "400px",
      }}>
        <h2>{column}</h2>
        <form style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
      
        }}>
          <label style={{
            fontSize: "12px",
            fontWeight: "bold",

          }} htmlFor="title">Title</label>
          <input
            
            type="text"
            name="title"
            value={data.title}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #222",

            }}
            onChange={(e) => {
              setData({
                ...data,
                title: e.target.value,
              });
            }}
          />

          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end",
          
          }}>
            <button
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #222",
              backgroundColor: "#222",
              color: "white",
              cursor: "pointer",

            }}
              onClick={(e) => {
                e.preventDefault();
                onSaved(data);
                setData({
                  id: Math.random() * 1000 + Math.random(),
                  title: "",
                });
              }}
            >
              Guardar
            </button>
            <button
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #222",
              backgroundColor: "#222",
              color: "white",
              cursor: "pointer",

            }}
              onClick={(e) => {
                e.preventDefault();
                onClosed();
                setData({
                  id: Math.random() * 1000 + Math.random(),
                  title: "",
                });
              }}
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewData;
