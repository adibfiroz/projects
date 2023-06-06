import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, reFetch } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== item.id));
      reFetch();
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
