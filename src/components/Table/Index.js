import clsx from "clsx"

function Wrap ({children, vertical,}) {
  return (
    <div className={clsx(vertical, "overflow-x-auto relative shadow-md sm:rounded-lg")}>
      {children}
    </div>
  )
}

function Table({ children, direction = "text-left", fontSize = "text-sm" }) {
  return (
      <table className={clsx(direction, fontSize, "w-full text-gray-500")}>
        {children}
      </table>
  )
}

function Thead({ children, className }) {
  return (
    <thead className={clsx(className, "text-xs text-gray-700 uppercase bg-gray-50")}>
      {children}
    </thead>
  )
}

function Tr({ children, className = "bg-white border-b" }) {
  return (
    <tr className={clsx(className)}>
      {children}
    </tr>
  )
}

function Th({ children, className }) {
  return (
    <th scope="col" className="py-3 px-6">
      <div className={clsx(className, "flex items-center")}>
        {children}
      </div>
    </th>
  )
}

function Td({ children, className, ...props }) {
  return (
    <td {...props} className={clsx(className, "py-2 px-6")}>
      {children}
    </td>
  )
}

Table.wrap = Wrap
Table.table = Table
Table.thead = Thead
Table.tr = Tr
Table.th = Th
Table.td = Td

export default Table