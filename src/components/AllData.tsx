import { FC, useState } from "react";
import Modal from "./Modal";
import Table from "./Table";

const AllData: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "0px 0px 20px 20px" }}>
      <span>
        Para ver toda la data junta en una tabla, puedes verla{" "}
        <button
          onClick={() => {
            setOpen(!open);
          }}
        >
          aquí
        </button>{" "}
        La tabla utiliza el cache de react query, por lo que si ya se ha
        consultado la data, no se volverá a consultar.
      </span>
      <Modal
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
      >
        <Table />
      </Modal>
    </div>
  );
};

export default AllData;
