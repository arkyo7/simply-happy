import { siteConfig } from "@/config/siteConfig";

export function LaunchBar() {
  return (
    <div className="w-full bg-belgium-yellow px-4 py-2 text-center">
      <p className="mx-auto max-w-[1200px] text-[13px] font-semibold text-belgium-black sm:text-sm">
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-2 w-2 rounded-full bg-belgium-red align-middle"
        />
        Preço de lançamento por tempo limitado: Kit completo por apenas {siteConfig.currentPrice}
      </p>
    </div>
  );
}
