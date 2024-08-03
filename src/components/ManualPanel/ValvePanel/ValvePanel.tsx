import { Button, ButtonSkeleton, TextInput } from "@carbon/react";
import styles from "./ValvePanel.module.css";
import { ValveType } from "../ManualPanel";

interface ValvePanelProps {
  id: ValveType;
  name: string;
  defaultTimeOpen?: number;
  disabled: boolean;
  value?: number;
  onClick: ({ id, timeout }: { id: ValveType; timeout?: number }) => void;
  onChange: (value: number) => void;
  loading: boolean;
  status: "OPENED" | "CLOSED";
}

const ValvePanel: React.FC<ValvePanelProps> = ({
  name,
  id,
  disabled,
  onClick,
  value,
  onChange,
  loading,
  status,
}) => {
  return (
    <div className={styles.ValvePanel}>
      <div className={styles.ValvePanel_header}>
        <h3>{name}</h3>
        <span>Status: {status}</span>
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
          value={value}
          onChange={(event) => onChange(+event.target.value)}
        />
      </div>
      {loading === true ? (
        <Button
          disabled={disabled}
          onClick={() => onClick({ id, timeout: value })}
        >
          Toogle valve
        </Button>
      ) : (
        <ButtonSkeleton />
      )}
    </div>
  );
};

export default ValvePanel;
