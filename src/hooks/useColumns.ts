import { useEffect } from "react";
import { useDashboard } from "../context/Dashboard";

const useColumns = () => {
  const {
    columns,
    columnRefs,
    simultaneouslyScrolling,
    setSimultaneouslyScrolling,
    master,
    setMaster,
  } = useDashboard();

  if (!columnRefs) {
    return null;
  }

  const handleScroll = (index: number, scrollTop: number) => {
    columnRefs.current.forEach((ref, i) => {
      if (ref && i !== index) {
        ref.scrollTop = scrollTop;
      }
    });
  };
  useEffect(() => {
    const callback = (e: Event) => {
      const { scrollTop } = e.target as HTMLUListElement;
      const index = columnRefs.current.indexOf(master);
      handleScroll(index, scrollTop);
    };

    if (master) {
      master.addEventListener("scroll", callback);
    }

    return () => {
      if (master) {
        master.removeEventListener("scroll", callback);
      }
    };
  }, [master]);

  return {
    columns,
    columnRefs,
    simultaneouslyScrolling,
    setSimultaneouslyScrolling,
    master,
    setMaster,
  };
}

export default useColumns;