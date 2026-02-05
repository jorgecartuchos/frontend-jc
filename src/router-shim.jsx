"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();
  return (to) => {
    if (typeof to === "number") return;
    router.push(to);
  };
};

export const useLocation = () => {
  const pathname = usePathname();
  return { pathname: pathname ?? "/", state: null };
};

export const useParamsShim = () => {
  // Next returns an object; react-router's useParams returns string values.
  const params = useParams();
  return params ?? {};
};
