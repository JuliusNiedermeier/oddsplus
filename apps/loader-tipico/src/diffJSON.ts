type ComparisonResult = "unchanged" | "created" | "deleted" | "updated";

interface Change {
  path: string[];
  type: ComparisonResult;
  data: any;
}

interface CompareStackItem {
  a: Record<string, any>;
  b: Record<any, any>;
  parents: string[];
}

interface DiffOptions {
  skipUnchanged: boolean;
}

const compareValues = (a: any, b: any): ComparisonResult => {
  if (a === b) return "unchanged";
  if (a === undefined) return "created";
  if (b === undefined) return "deleted";
  return "updated";
};

const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

const isArray = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Array]";
};

const defaultDiffOptions: DiffOptions = {
  skipUnchanged: true,
};

export const diffJSON = (
  a: Record<string, any>,
  b: Record<any, any>,
  options?: DiffOptions
) => {
  const mergedOptions = { ...defaultDiffOptions, ...options };
  const compareStack: CompareStackItem[] = [{ a, b, parents: [] }];
  const changes: Change[] = [];

  while (compareStack.length) {
    const { a, b, parents } = compareStack.pop()!;
    const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const aValue = a[key];
      const bValue = b[key];

      if (isObject(aValue) || isObject(bValue)) {
        compareStack.push({
          a: aValue || {},
          b: bValue || {},
          parents: [...parents, key],
        });
        continue;
      }

      if (isArray(aValue) || isArray(bValue)) {
        compareStack.push({
          a: Object.assign({}, aValue || []),
          b: Object.assign({}, bValue || []),
          parents: [...parents, key],
        });
        continue;
      }

      const type = compareValues(aValue, bValue);

      if (type === "unchanged" && mergedOptions.skipUnchanged) continue;

      changes.push({
        path: [...parents, key],
        type,
        data: aValue === undefined ? bValue : aValue,
      });
    }
  }

  return changes;
};
