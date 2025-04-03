"use client";
import { fetchAccreditations } from "@/app/utils/helpers/fetchAccreditationsById";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AccreditationsPage = () => {
  const { data } = useQuery({
    queryKey: ["accreditations"],
    queryFn: fetchAccreditations,
  });

  console.log(data);
  return (
    <div>
      <h1>this is the accreditations page</h1>
    </div>
  );
};

export default AccreditationsPage;
