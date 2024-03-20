"use client";
import { useState } from "react";

export function Signup({
  className,
  onClick,
}: {
  className?: string;
  onClick: (email: string, password: string) => void;
}): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={className}>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={async () => onClick(email, password)}>Submit</button>
    </div>
  );
}
