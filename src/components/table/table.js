import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useStateContext } from "../../contexts/contextProvider";
import { URL } from "../../data/constants";
import Tr from "./tr";
import Toolbar from "./toolbar/toolbar";
import Thead from "./thead";
import Tbody from "./tbody";
import Loading from "./loading/loading";
import Pagination from "./pagination/paginationComp";
import SearchComp from "./search/searchComp";
import { TableContext } from "../../contexts/tableContext";

const Table = ({ rows, columns, titles, setRow, setData, search, form }) => {
  // Url for data
  const targetURL = `${URL}/${titles[2]}`;
  // Context
  const {
    screenSize,
    isLoading,
    openSidebar,
    displayLines,
    setDisplayLines,
    setLineSpacing,
    stickyRight,
    setStickyRight,
    stickyLeft,
    setStickyLeft,
    sortBy,
    setSortBy,
  } = useStateContext();

  // For loading
  const rowLoading = [
    columns,
    columns,
    columns,
    columns,
    columns,
    columns,
    columns,
    columns,
    columns,
    columns,
  ];

  // Responsive cases
  useEffect(() => {
    if (screenSize <= 1000) setDisplayLines(false);
    else setDisplayLines(true);
  }, [screenSize]);

  // Columns sticky
  const handleStickyRight = () => {
    if (stickyRight > 1) {
      setStickyRight(0);
      localStorage.stickyRight = 0;
    } else {
      setStickyRight(stickyRight + 1);
      localStorage.stickyRight = stickyRight + 1;
    }
  };
  const handleStickyLeft = () => {
    if (stickyLeft > 1) {
      setStickyLeft(0);
      localStorage.stickyLeft = 0;
    } else {
      setStickyLeft(stickyLeft + 1);
      localStorage.stickyLeft = stickyLeft + 1;
    }
  };
  const headerSticky = (column) => {
    return column.col === "main" && stickyRight > 0
      ? "sticky right-0 bg-gray-100 dark:bg-zinc-600"
      : column.col === "titles" && stickyRight > 1
      ? "sticky right-[180px] bg-gray-100 dark:bg-zinc-600"
      : column.col === "badge" && stickyLeft > 1
      ? "sticky left-[100px] bg-gray-100 dark:bg-zinc-600"
      : column.col === "actions" && stickyLeft > 0
      ? "sticky left-0 bg-gray-100 dark:bg-zinc-600"
      : "";
  };

  // Lines spacing
  const handleLineSpacing = (space) => {
    setLineSpacing(space);
    localStorage.lineSpacing = space;
  };

  // Print functions
  const tableRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <TableContext values={form[0]} setValues={form[1]}>
      <div className="lg:flex justify-between items-end">
        <Toolbar
          handlePrint={handlePrint}
          rows={rows}
          title={titles[0]}
          handleLineSpacing={handleLineSpacing}
          handleStickyRight={handleStickyRight}
          handleStickyLeft={handleStickyLeft}
          form={form}
          titles={titles}
          targetURL={targetURL}
        />
        {search && (
          <SearchComp
            columns={columns}
            keys={search[0]}
            keysDate={search[1]}
            fixData={search[2]}
            setData={setData}
            url={targetURL}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}
      </div>
      {displayLines ? (
        <div className="shadow dark:shadow-xl border border-neutral-200 dark:border-neutral-800 max-h-[calc(100vh-29vh)] overflow-auto scroll-smooth rounded-lg m-2">
          <table
            className="min-w-full max-w-[100%] table-auto divide-y divide-gray-200 scroll-smooth dark:divide-gray-500"
            ref={tableRef}
          >
            <Thead
              columns={columns}
              headerSticky={headerSticky}
              setData={setData}
              url={targetURL}
              fixData={search[2]}
            />
            <Tbody
              isLoading={isLoading}
              rowLoading={rowLoading}
              rows={rows}
              columns={columns}
              setRow={setRow}
            />
          </table>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ${
            !openSidebar
              ? "2xl:grid-cols-4"
              : screenSize > 1670 && "2xl:grid-cols-4"
          } ${screenSize > 2000 && "2xl:grid-cols-5"} gap-4 m-2 mt-5`}
        >
          {isLoading ? (
            <Loading rowLoading={rowLoading} />
          ) : (
            <>
              {rows.map((row, i) => (
                <Tr columns={columns} row={row} key={i} setRow={setRow} />
              ))}
            </>
          )}
        </div>
      )}
      {search && <Pagination url={targetURL} rows={rows} />}
    </TableContext>
  );
};

export default Table;
