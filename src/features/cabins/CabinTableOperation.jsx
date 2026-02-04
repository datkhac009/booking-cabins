import TableOperations from "./../../ui/TableOperations";
import Filter from "./../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter></Filter>
      <SortBy
        option={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low -> hight)" },
          { value: "regularPrice-desc", label: "Sort by price (hight -> low)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low -> hight)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (hight -> low)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
