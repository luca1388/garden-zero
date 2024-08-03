import { ValveController } from "@/models/ValveController";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query;
  const { timeout, command } = JSON.parse(req.body);

  console.log(req.body);
  console.log(timeout);

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }
  if (ValveController.isValveBusy() && command === "OPEN") {
    res.status(500).json({ error: "Valve already opened" });
  }
  if (!id) {
    res.status(400).json({ error: "Missing valve id" });
  }
  if (typeof id === "string" && command === "OPEN") {
    ValveController.openValve({ id, timeout });
  } else if (typeof id === "string" && command === "CLOSE") {
    ValveController.closeValve({ id });
  }
  res.status(200).json({ message: "id: " + id });
}
