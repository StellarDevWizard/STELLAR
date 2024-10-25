"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const Routes = [
    {
      name: "Account",
      ActiveLink: "account",
      pathLink: "/stellar-intel/account",
    },
    {
      name: "Preferences",
      ActiveLink: "preferences",
      pathLink: "/stellar-intel/preferences",
    },
    {
      name: "Community",
      ActiveLink: "community",
      pathLink: "/stellar-intel/community",
    },
    {
      name: "Authorized Apps",
      ActiveLink: "apps-linked",
      pathLink: "/stellar-intel/apps-linked",
    },
  ];

  return (
    <div className=" sticky top-0 z-50 w-full border-b backdrop-blur-lg border-slate-500/50">
      <div className="w-full flex items-center justify-center bg-gradient-to-t from-black/20 to-blue-500/5">
        <div
          className={`transition-all ${
            isScrolled ? "h-[70px]" : "h-[94px]"
          } px-2 pt-1 w-full max-w-3xl`}
        >
          <div className="w-full">
            <div>
              <h1
                className={`font-medium transition-all ${
                  isScrolled ? "text-xl py-[3px]" : "text-[32px] py-[5px]"
                }`}
              >
                Settings
              </h1>
            </div>
            <div className="w-5/6 ">
              <div
                role="tab"
                className="tabs tabs-bordered flex flex-row gap-3"
              >
                {Routes?.map((item: any, index: any) => (
                  <div key={index} className="">
                    <a
                      role="tab"
                      onClick={() => router.push(item?.ActiveLink)}
                      className={`tab text-[16px] ${
                        pathname.startsWith(item.pathLink)
                          ? "border-b-2 border-slate-300"
                          : "border-none"
                      }`}
                    >
                      {item?.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
