export function loadJson<T>(fileName: string) {
    // Files in the public directory are served at the root path
    // Instead of /public/json_data, use /json_data
    const json = fetch(`/json_data/${fileName}.json`).then(r => r.json());
    return json as Promise<T>;
};