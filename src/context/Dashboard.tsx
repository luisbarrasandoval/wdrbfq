import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";

export type DashBoardParams = {
  columns: any[];
  setColumn: any;
  columnRefs?: React.MutableRefObject<(HTMLUListElement | null)[]>;
  simultaneouslyScrolling: boolean;
  setSimultaneouslyScrolling: any;
  master: HTMLUListElement | null;
  setMaster: any;

};

export const DashboardConext = createContext<DashBoardParams>({
  columns: [],
  setColumn: () => {},
  simultaneouslyScrolling: false,
  setSimultaneouslyScrolling: () => {},
  master: null,
  setMaster: () => {},
});

export const useDashboard = () => {
  const context = useContext(DashboardConext);
  return context;
};

export const DashBoradProvider: FC<
  PropsWithChildren & {
    data: any[];
  }
> = ({ children, data }) => {
  const [columns, setColumn] = useState(data);
  const columnRefs = useRef<(HTMLUListElement | null)[]>([]);
  const [ simultaneouslyScrolling, setSimultaneouslyScrolling ] = useState(true);
  const [master, setMaster] = useState<HTMLUListElement | null>(null);

  return (
    <DashboardConext.Provider
      value={{
        columns,
        setColumn,
        columnRefs,
        simultaneouslyScrolling,
        setSimultaneouslyScrolling,
        master,
        setMaster,
      }}
    >
      {children}
    </DashboardConext.Provider>
  );
};
