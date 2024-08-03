import { ValveType } from "@/components/ManualPanel/ManualPanel";

export type Valve = {
  id: ValveType;
  name: string;
  status: "OPENED" | "CLOSED";
};

export const ValveController = (() => {
  let openedValveId: string | null = null;
  let closeTimeout: NodeJS.Timeout | null = null;
  const valves: Valve[] = [
    { id: ValveType.Z1, name: "Giardino grande sx", status: "CLOSED" },
    { id: ValveType.Z2, name: "Giardino grande dx", status: "CLOSED" },
    { id: ValveType.Z3, name: "Orto", status: "CLOSED" },
    { id: ValveType.Z4, name: "Giardino piccolo", status: "CLOSED" },
  ];
  const closeValve = ({ id }: { id: string }) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    triggerRelay({ id, polarity: "NEGATIVE" });
    openedValveId = null;
  };
  const openValve: ({
    id,
    timeout,
  }: {
    id: string;
    timeout: number;
  }) => void = ({ id, timeout = 5 * 60 * 1000 }) => {
    if (openedValveId) {
      return false;
    }
    triggerRelay({ id, polarity: "POSITIVE" });
    openedValveId = id;

    closeTimeout = setTimeout(() => {
      closeValve({ id });
    }, timeout);
  };

  const isValveBusy = () => !!openedValveId;
  const getValvesStatus: () => Valve[] = () =>
    valves.map((valve) =>
      valve.id === openedValveId
        ? { ...valve, status: "OPENED" }
        : { ...valve, status: "CLOSED" }
    );

  const getOpenedValveId = () => openedValveId;

  return {
    openValve,
    closeValve,
    isValveBusy,
    getOpenedValveId,
    getValvesStatus,
  };
})();

const triggerRelay = ({
  id,
  polarity,
}: {
  id: string;
  polarity: "NEGATIVE" | "POSITIVE";
}) => {
  console.log(id);
  console.log(polarity);
};
