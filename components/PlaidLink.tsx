"use client";

import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useEffect } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "./ui/button";
// import { createLinkToken} from "@/lib/actions/user.actions";

const PlaidLink = ({
  user,
  variant,
}: {
  user: User;
  variant: "primary" | "ghost";
}) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, []);
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    [user]
  );
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect Bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
};

export default PlaidLink;