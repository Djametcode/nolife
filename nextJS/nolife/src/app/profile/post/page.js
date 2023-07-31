"use client";

import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function PostListComponent() {
  const segment = useSelectedLayoutSegments();
  return <div>{segment}</div>;
}
