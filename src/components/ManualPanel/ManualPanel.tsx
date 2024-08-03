import { useEffect, useState } from "react";
import styles from "./ManualPanel.module.css";
import ValvePanel from "./ValvePanel/ValvePanel";
import { Valve } from "@/models/ValveController";

export enum ValveType {
  Z1 = "zone-1",
  Z2 = "zone-2",
  Z3 = "zone-3",
  Z4 = "zone-4",
}
const ManualPanel = () => {
  const [enabledValveName, setEnabledValveName] = useState<ValveType | "">("");
  const [valveStatus, setValveStatus] = useState<Valve[]>();
  const [timeoutZone1, setTimeoutZone1] = useState<number>(5);
  const [timeoutZone2, setTimeoutZone2] = useState<number>(5);
  const [timeoutZone3, setTimeoutZone3] = useState<number>(5);
  const [timeoutZone4, setTimeoutZone4] = useState<number>(5);

  const fetchValveStatus = async () => {
    fetch("/api/v1/valves/status")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const openedValve = data.valves.find(
          (valve: Valve) => valve.status === "OPENED"
        )?.id;

        if (openedValve) {
          setEnabledValveName(openedValve);
        } else {
          setEnabledValveName("");
        }
        setValveStatus(data.valves);
      });
  };

  useEffect(() => {
    fetchValveStatus();
  }, []);

  const clickHandler = ({
    id,
    timeout,
  }: {
    id: ValveType;
    timeout: number;
  }) => {
    const timeoutMs = timeout * 60 * 1000;
    fetch(`/api/v1/valves/${name}`, {
      method: "POST",
      body: JSON.stringify({
        timeout: timeoutMs,
        command: id === enabledValveName ? "CLOSE" : "OPEN",
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    setEnabledValveName((prev) => {
      if (prev) {
        return "";
      }
      return id;
    });

    setTimeout(() => {
      fetchValveStatus();
    }, timeoutMs + 5000);
  };
  return (
    <div className={styles.ManualPanel}>
      <h1 className={styles.ManualPanel_title}>GardenZero: Manual mode</h1>

      <div className={styles.ManualPanel_row}>
        <ValvePanel
          name={ValveType.Z1}
          id={ValveType.Z1}
          disabled={Boolean(
            enabledValveName !== "" && enabledValveName !== ValveType.Z1
          )}
          onClick={clickHandler}
          onChange={(value) => setTimeoutZone1(value)}
          value={timeoutZone1}
          loading={!!valveStatus}
        />
        <ValvePanel
          name={ValveType.Z2}
          id={ValveType.Z2}
          disabled={
            enabledValveName !== "" && enabledValveName !== ValveType.Z2
          }
          onClick={clickHandler}
          onChange={(value) => setTimeoutZone2(value)}
          value={timeoutZone2}
          loading={!!valveStatus}
        />
      </div>
      <div className={styles.ManualPanel_row}>
        <ValvePanel
          name={ValveType.Z3}
          id={ValveType.Z3}
          disabled={
            enabledValveName !== "" && enabledValveName !== ValveType.Z3
          }
          onClick={clickHandler}
          onChange={(value) => setTimeoutZone3(value)}
          value={timeoutZone3}
          loading={!!valveStatus}
        />
        <ValvePanel
          name={ValveType.Z4}
          id={ValveType.Z4}
          disabled={
            enabledValveName !== "" && enabledValveName !== ValveType.Z4
          }
          onClick={clickHandler}
          onChange={(value) => setTimeoutZone4(value)}
          value={timeoutZone4}
          loading={!!valveStatus}
        />
      </div>
    </div>
  );
};

export default ManualPanel;
