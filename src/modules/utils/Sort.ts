import { Model } from "../models/Model";

type InstanceModel = InstanceType<typeof Model>[];

export interface Sort {
  sort: (models: InstanceModel) => void;
}
