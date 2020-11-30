const values = {
  subFolder: process.env.NODE_ENV === "production" ? "/" : "/",
  working_hours: {
    start: "10:00",
    end: "22:00"
  }
};
export default values;
