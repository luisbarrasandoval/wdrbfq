import { FC, useEffect, useRef, useState } from "react";
import { useDashboard } from "../context/Dashboard";
import Column from "./Column";

const Columns: FC = () => {
  const {
    columns,
    columnRefs,
    simultaneouslyScrolling,
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          overflowX: "auto",
        }}
      >
        {columns.map(
          ({ url, name, contrastColor, backgroundColor, width }, index) => (
            <Column
              key={url}
              url={url}
              name={name}
              width={width}
              backgroundColor={backgroundColor}
              color={contrastColor}
              ref={(ref) => {
                if (simultaneouslyScrolling) {
                  columnRefs.current[index] = ref;
                } else {
                  columnRefs.current[index] = null;
                }
              }}
              onMouseOver={(e) => {
                const ref = columnRefs.current[index];
                setMaster(ref);
              }}
              onMouseOut={() => {
                setMaster(null);
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Columns;
