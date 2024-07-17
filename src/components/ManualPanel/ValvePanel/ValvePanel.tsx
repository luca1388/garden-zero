import { Button, TextInput } from "@carbon/react";
import styles from "./ValvePanel.module.css";
import { ValveType } from "../ManualPanel";

interface ValvePanelProps {
  name: ValveType;
  defaultTimeOpen?: number;
  disabled: boolean;
  onClick: (name: ValveType) => void;
}

const ValvePanel: React.FC<ValvePanelProps> = ({ name, disabled, onClick }) => {
  return (
    <div className={styles.ValvePanel}>
      <div className={styles.ValvePanel_header}>
        <h3>{name}</h3>
        <span>Status: closed</span>
      </div>
      <div>
        <TextInput
          id="opened'time"
          labelText="Valve opened duration"
          type="number"
          min={1}
          max={20}
          placeholder="Valve opened duration"
          defaultValue={5}
          disabled={disabled}
        />
      </div>
      <Button disabled={disabled} onClick={() => onClick(name)}>
        Toogle valve
      </Button>
    </div>
  );
};

export default ValvePanel;
