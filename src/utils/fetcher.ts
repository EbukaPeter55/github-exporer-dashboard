export const fetcher = async (url: string) => {
    const res = await fetch(url);
    const result = await res.json();
    if (result?.errors) {
        throw new Error(result.errors[0].message || 'Failed to fetch data.');
    }
    return result;
};
