export const isSelectorValid = (selector: string): boolean => {
  try {
    document.createDocumentFragment().querySelector(selector);
  } catch {
    return false;
  }

  return true;
};
