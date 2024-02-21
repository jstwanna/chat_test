export const  createTypeChecker = <T>(fields: (keyof T)[]) => {
    return (item: unknown): item is T => {
        return typeof item === 'object' && item !== null && fields.every((field) => field in item);
    };
  }

  