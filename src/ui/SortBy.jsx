import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ option }) {
    const [searchParams,setSearchParams] = useSearchParams()
    const sortBy = searchParams.get("sortBy") || ''
    function handleChange(e){
        searchParams.set("sortBy",e.target.value)
        setSearchParams(searchParams)
    }
  return (
    <>
      <Select options={option} value={sortBy} onChange={handleChange}/>
    </>
  );
}

export default SortBy;
