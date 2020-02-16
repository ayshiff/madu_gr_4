// Edit
export const editReference = (id: string, referenceArg, store) =>
    store.map(reference => (reference.id === id ? referenceArg : reference));

// Remove
export const removeReference = (id: string, store) =>
    store.filter(reference => reference.id !== id);
