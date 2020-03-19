import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import redirectTo from "../lib/redirectTo";
import useSWR  from 'swr'
import fetch from '../lib/fetch'

const Index = () => {
  const [url, setUrl] = useState({});
  const router = useRouter();

  const {data, error} = useSWR(`/api/lookup?linkId=${router.query.id}`, fetch)

  if (data) {
    try {
      redirectTo(data.data.redirectUrl);
    }
    catch {
      redirectTo("/")
    }
  }

  return (
    <>
    </>
  );
};
export default Index;
