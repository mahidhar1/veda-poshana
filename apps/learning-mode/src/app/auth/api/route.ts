// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "db";
import jwt from "jsonwebtoken";
import { ensureDbConnected } from "@/lib/dbConnect";
const SECRET = "SECRET";

type Data = {
  token?: string;
  message?: string;
  name?: string;
};

export async function POST(req: Request) {
  console.log("handler called");
  await ensureDbConnected();

  const { email, password } = await req.json();
  const admin = await Admin.findOne({ email });

  if (admin) {
    return new Response(JSON.stringify({ message: "Email already exists" }), {
      headers: { "Content-Type": "application/json" },
      status: 403,
    });
  } else {
    const obj = { email: email, password: password };

    const newAdmin = new Admin({ ...obj });
    newAdmin.save();

    const token = jwt.sign({ email, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    return new Response(
      JSON.stringify({ message: "Admin created successfully", token }),
      {
        headers: { "Content-Type": "application/json" },
        status: 201,
      },
    );
  }
}
