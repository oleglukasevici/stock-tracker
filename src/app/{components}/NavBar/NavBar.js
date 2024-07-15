"use client";

import { Button, Typography } from "@mui/material";

import { PATHS } from "@/constants";
import { auth } from "@/firebase-config";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const router = useRouter();

  const handleGoStock = () => {
    router.push(PATHS.stock);
  };

  const handleGoAlert = () => {
    router.push(PATHS.alert);
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="w-full h-[60px] flex items-center gap-[104px]">
      <div className="flex items-center flex-1 gap-[60px]">
        <Button
          classes={{
            root: "w-[190px] h-[52px] !rounded-[10px] flex gap-2 !border-[var(--palette-primary-text4)] !text-[20px]",
          }}
          variant="outlined"
          onClick={handleGoStock}
        >
          <Typography className="text-[var(--palette-primary-text4)] normal-case text-[14px] !font-poppins">
            Stock
          </Typography>
        </Button>
        <Button
          classes={{
            root: "w-[190px] h-[52px] !rounded-[10px] flex gap-2 !border-[var(--palette-primary-text4)] !text-[20px]",
          }}
          variant="outlined"
          onClick={handleGoAlert}
        >
          <Typography className="text-[var(--palette-primary-text4)] normal-case text-[14px] !font-poppins">
            Alert
          </Typography>
        </Button>
      </div>
      <Button
        classes={{
          root: "w-[190px] h-[52px] !rounded-[10px] flex gap-2 !border-[var(--palette-primary-text4)] !text-[20px]",
        }}
        variant="outlined"
        onClick={handleSignOut}
      >
        <Typography className="text-[var(--palette-primary-text4)] normal-case text-[14px] !font-poppins">
          Sign out
        </Typography>
      </Button>
    </div>
  );
};
