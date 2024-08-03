import { useEffect, useState } from "react";
import styles from "./ManualPanel.module.css";
import ValvePanel from "./ValvePanel/ValvePanel";
import { Valve } from "@/models/ValveController";
import { Loading } from "@carbon/react";

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

  const [timeoutZones, setTimeoutZones] =
    useState<{ id: string; timeout: number }[]>();

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

  useEffect(() => {
    if (valveStatus) {
      setTimeoutZones(
        valveStatus.map((valve) => ({ id: valve.id, timeout: 5 }))
      );
    }
  }, [valveStatus]);

  const clickHandler = ({
    id,
    timeout = 1,
  }: {
    id: ValveType;
    timeout?: number;
  }) => {
    const timeoutMs = timeout * 60 * 1000;
    fetch(`/api/v1/valves/${id}`, {
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

  const changeHandler = ({
    value,
    valveId,
  }: {
    value: number;
    valveId: string;
  }) => {
    const updatedTimeoutZones = timeoutZones?.map((timeout) =>
      timeout.id === valveId ? { ...timeout, timeout: value } : timeout
    );
    setTimeoutZones(updatedTimeoutZones);
  };
  return (
    <div className={styles.ManualPanel}>
      <h1 className={styles.ManualPanel_title}>GardenZero: Manual mode</h1>

      <div className={styles.ManualPanel_grid}>
        {!valveStatus && <Loading withOverlay={false} />}

        {valveStatus?.map((valve) => {
          const timeoutValue =
            timeoutZones?.find((zone) => zone.id === valve.id)?.timeout || 5;
          return (
            <ValvePanel
              key={valve.id}
              name={valve.name}
              id={valve.id}
              disabled={Boolean(
                enabledValveName !== "" && enabledValveName !== valve.id
              )}
              onClick={clickHandler}
              onChange={(value) => changeHandler({ valveId: valve.id, value })}
              value={timeoutValue}
              loading={!!valveStatus}
              status={enabledValveName === valve.id ? "OPENED" : "CLOSED"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ManualPanel;
