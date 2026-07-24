"use client";

import dynamic from "next/dynamic";

const SecurePdfViewer = dynamic(() => import("@/components/SecurePdfViewer"), { ssr: false });

export default function SecurePdfViewerWrapper({ url }: { url: string }) {
  return <SecurePdfViewer url={url} />;
}
