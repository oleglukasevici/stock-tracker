"use client";

import { useState } from "react";
import { auth } from "@/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      router.push(PATHS.login);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4">Please register your account</Typography>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2"
      />
      <Button onClick={handleRegister} variant="outlined">
        Register
      </Button>
      <Link href={PATHS.login}>
        <Typography className="text-sm underline">{`Go to log in if you already have account`}</Typography>
      </Link>
    </>
  );
}
