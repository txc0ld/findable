import type { Dispatch, SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";
import type { WorkspaceData } from "@findable/shared";

export interface DashboardOutletContext {
  email: string;
  refreshWorkspace: () => Promise<void>;
  setWorkspace: Dispatch<SetStateAction<WorkspaceData | null>>;
  workspace: WorkspaceData;
}

export function useDashboardContext() {
  return useOutletContext<DashboardOutletContext>();
}
