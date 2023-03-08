import { BaseNormalizedEntity } from "./types/BaseNormalizedEntitySchema.js";

export const diffEntityArrays = <TEntity extends BaseNormalizedEntity>(
  previousArray: TEntity[],
  currentArray: TEntity[]
) => {
  const created = currentArray.filter(
    (current) => !previousArray.find((previous) => previous.id === current.id)
  );

  const deleted = previousArray.filter(
    (previous) => !currentArray.find((current) => current.id === previous.id)
  );

  const updated = currentArray.filter((current) => {
    const previous = previousArray.find(
      (previous) => previous.id === current.id
    );

    if (!previous) return false;
    if (JSON.stringify(previous) === JSON.stringify(current)) return false;

    return true;
  });

  return { created, deleted, updated };
};
