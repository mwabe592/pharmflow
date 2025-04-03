import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <span className="text-lg font-bold text-primary-foreground">A</span>
      </div>
      <div className="font-semibold">Accredit</div>
    </div>
  );
};

export default Logo;
