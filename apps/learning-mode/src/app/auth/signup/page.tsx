"use client";
import { Signup } from "@repo/ui/signup";
import axios from "axios";
import React from "react";

const BASE_URL = "http://localhost:3000";

function signup() {
  return (
    <div>
      Signup page
      <Signup
        onClick={async (email, password) => {
          console.log(email, password);
          try {
            let res = await axios.post(`/auth/api`, {
              email,
              password,
            });
            console.log(res);
          } catch (err) {
            console.log("Error while calling api", err);
          }
        }}
      />
    </div>
  );
}

export default signup;
