import { Valve, ValveController } from "@/models/ValveController";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  valves?: Valve[];
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
  }
  ValveController;
  res.status(200).json({ valves: ValveController.getValvesStatus() });
}
