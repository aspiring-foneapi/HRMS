import React from "react";
import { useParams } from "react-router-dom";

function Employee() {
  const params = useParams();
  const { email } = params;

  return <div>{email}</div>;
}

export default Employee;
