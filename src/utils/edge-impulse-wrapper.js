let classifierInitialized = false;
window.Module = window.Module || {};
window.Module.onRuntimeInitialized = function() { classifierInitialized = true; };

export class EdgeImpulseClassifier {
    _initialized = false;

    init() {
        if (classifierInitialized === true) return Promise.resolve();
        return new Promise((resolve) => {
            const oldOnRuntimeInitialized = window.Module.onRuntimeInitialized;
            window.Module.onRuntimeInitialized = () => {
                if (oldOnRuntimeInitialized) oldOnRuntimeInitialized();
                resolve();
                classifierInitialized = true;
            };
        });
    }

    classify(rawData, debug = false) {
        if (!classifierInitialized) throw new Error('Module is not initialized');
        const obj = this._arrayToHeap(rawData);
        let ret = window.Module.run_classifier(obj.buffer.byteOffset, rawData.length, debug);
        window.Module._free(obj.ptr);
        if (ret.result !== 0) throw new Error('Classification failed code: ' + ret.result);
        
        let jsResult = { anomaly: ret.anomaly, results: [] };
        for (let cx = 0; cx < ret.size(); cx++) {
            let c = ret.get(cx);
            jsResult.results.push({ label: c.label, value: c.value });
            c.delete();
        }
        ret.delete();
        return jsResult;
    }

    _arrayToHeap(data) {
        let typedArray = new Float32Array(data);
        let numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
        let ptr = window.Module._malloc(numBytes);
        let heapBytes = new Uint8Array(window.Module.HEAPU8.buffer, ptr, numBytes);
        heapBytes.set(new Uint8Array(typedArray.buffer));
        return { ptr: ptr, buffer: heapBytes };
    }
}
