export const fetcher = (url: string) =>
    fetch(url).then(async (res) => {
        if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.');
            (error as any).info = await res.json();
            (error as any).status = res.status;
            throw error;
        }
        return res.json();
    });
