import React from "react";
import Link from "next/link";
import { Button } from "../components";

export default function Home() {
  return (
    <Button as={Link} href="/" intent="primary">
      Click Me
    </Button>
  );
}
