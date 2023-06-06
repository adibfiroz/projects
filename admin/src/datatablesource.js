export const userColumns = [
  { field: "_id", headerName: "ID", width: 50 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.profilePic || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
            }
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "zipcode",
    headerName: "ZipCode",
    width: 100,
  },
  {
    field: "mobile",
    headerName: "Phone",
    width: 100,
  },
];

export const softwareColumns = [
  { field: "_id", headerName: "ID", width: 50 },
  {
    field: "software name",
    headerName: "Software Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.sofwareLogo || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
            }
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "whatIs",
    headerName: "whatIs",
    width: 180,
  },

  {
    field: "website",
    headerName: "Website",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
];

export const categoryColumns = [
  { field: "_id", headerName: "Category ID", width: 250 },
  {
    field: "name",
    headerName: "category Name",
    width: 300,
  },
];

export const reviewColumns = [
  { field: "_id", headerName: "Review ID", width: 250 },

  {
    field: "title",
    headerName: "Review Title",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Review Desc",
    width: 200,
  },
  {
    field: "userId",
    headerName: "Written by",
    width: 200,
  },
  {
    field: "softId",
    headerName: "Wriiten on",
    width: 200,
  },
];
