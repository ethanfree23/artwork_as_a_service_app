/* eslint-disable react/jsx-key */
import { useTable } from "react-table"
import cns from "classnames"

function Table({ columns, data, onRowClick }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  const headerGroup = headerGroups[1]

  // Render the UI for your table
  return (
    <table {...getTableProps()} className="table-fixedd w-full ">
      <thead>
        {/* {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))} */}
        <tr {...headerGroup.getHeaderGroupProps()} className="text-left border-b border-grey-400">
          {headerGroup.headers.map((column, index) => (
            <th
              key={column.id}
              column={column}
              className={cns("px-4 py-3 text-base whitespace-nowrap", index !== 0 && "hidden lg:table-cell")}
            >
              {column.render("Header")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr
              {...row.getRowProps()}
              className="border-b border-grey-400 cursor-pointer"
              onClick={() => onRowClick(row.original)}
            >
              {row.cells.map((cell, index) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className={cns("px-4 py-3 text-sm whitespace-nowrap", index !== 0 && "hidden lg:table-cell")}
                  >
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
