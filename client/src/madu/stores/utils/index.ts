// Edit
export const editReference = (referenceArg, store) =>
    store.map(reference => (reference.id === referenceArg.id ? referenceArg : reference));

// Remove
export const removeReference = (id: string, store) =>
    store.filter(reference => reference.id !== id);
