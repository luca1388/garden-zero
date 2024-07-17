import { useState } from "react";
import styles from "./ManualPanel.module.css";
import ValvePanel from "./ValvePanel/ValvePanel";

export enum ValveType {
  Z1 = "Zone 1",
  Z2 = "Zone 2",
  Z3 = "Zone 3",
  Z4 = "Zone 4",
}
const ManualPanel = () => {
  const [enabledValveName, setEnabledValveName] = useState<ValveType | "">("");

  const clickHandler = (name: ValveType) => {
    setEnabledValveName((prev) => {
      if (prev) {
        return "";
      }
      return name;
    });
  };
  return (
    <div className={styles.ManualPanel}>
      <h1 className={styles.ManualPanel_title}>GardenZero: Manual mode</h1>

      <div className={styles.ManualPanel_row}>
        <ValvePanel
          name={ValveType.Z1}
          disabled={Boolean(
            enabledValveName !== "" && enabledValveName !== ValveType.Z1
          )}
          onClick={clickHandler}
        />
        <ValvePanel
          name={ValveType.Z2}
          disabled={
            enabledValveName !== "" && enabledValveName !== ValveType.Z2
          }
          onClick={clickHandler}
        />
      </div>
      <div className={styles.ManualPanel_row}>
        <ValvePanel
          name={ValveType.Z3}
          disabled={
            enabledValveName !== "" && enabledValveName !== ValveType.Z3
          }
          onClick={clickHandler}
        />
        <ValvePanel
          name={ValveType.Z4}
          disabled={
            enabledValveName !== "" && enabledValveName !== ValveType.Z4
          }
          onClick={clickHandler}
        />
      </div>
    </div>
  );
};

export default ManualPanel;
