import { useMemo } from "react";
import { ApiResource } from "../../lib/api"

export const useApi = (resourceName: string) => {
    return useMemo(() => new ApiResource(resourceName), [resourceName]);
}