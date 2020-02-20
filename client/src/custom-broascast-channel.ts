/**
 * This module polyfills `BroadcastChannel` to be able to use it on
 * Safari.
 *
 * Some notable differences:
 *   - It won't work in a worker context (with ServiceWorker for
 *     instance)
 *   - It only works with JSONable messages
 *
 * The gist of the solution is to use the "storage events" to keep
 * every tab in sync. The "no worker" limitation comes from there
 * (local storage) is not available in a worker context, as well as the
 * "JSONable" messages only.
 *
 * The storage event might not be triggered in the page which has set
 * the value (in local storage) hence the need for a custom event.
 *
 */
const CUSTOM_BC_POLYFILL_STORAGE_KEY = "CUSTOM_BC_POLYFILL_STORAGE_KEY";

const withBroadcastChannel = typeof BroadcastChannel !== "undefined";

export const emitOnBroadcastChannel = (channel: string, message) => {
    // This is the "normal part"
    if (withBroadcastChannel) {
        const bc = new BroadcastChannel(channel);
        bc.postMessage(message);
        bc.close();
    }

    // This is the polyfill part
    else {
        const jsonedMessage = JSON.stringify({ channel, message });

        localStorage.setItem(CUSTOM_BC_POLYFILL_STORAGE_KEY, jsonedMessage);
        localStorage.removeItem(CUSTOM_BC_POLYFILL_STORAGE_KEY);

        const customEvent = new CustomEvent("inSamePageStorage", {
            detail: jsonedMessage,
        });
        window.dispatchEvent(customEvent);
    }
};

export const listenOnBroadcastChannel = (channel: string, callback: (any) => void) => {
    let cleanup: () => void;

    // This is the "normal part"
    if (withBroadcastChannel) {
        const bc = new BroadcastChannel(channel);
        bc.onmessage = callback;
        cleanup = () => bc.close();
    }

    // This is the polyfill part
    else {
        const storageListener = ev => {
            if (ev.originalEvent && ev.originalEvent.key !== CUSTOM_BC_POLYFILL_STORAGE_KEY) {
                return;
            }

            const messageAndChannel = JSON.parse(ev.originalEvent.newValue);

            if (messageAndChannel && messageAndChannel.channel === channel) {
                callback(messageAndChannel.message);
            }
        };
        window.addEventListener("storage", storageListener);

        const inSamePageStorageListener = ev => {
            const messageAndChannel = JSON.parse(ev.detail);
            if (messageAndChannel && messageAndChannel.channel === channel) {
                callback(messageAndChannel.message);
            }
        };
        window.addEventListener("inSamePageStorage", inSamePageStorageListener);

        cleanup = () => {
            window.removeEventListener("storage", storageListener);
            window.removeEventListener("inSamePageStorage", inSamePageStorageListener);
        };
    }

    return () => {
        cleanup();
    };
};
