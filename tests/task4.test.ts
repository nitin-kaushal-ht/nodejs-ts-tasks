import axios from 'axios';
import fs from 'fs';
import { jest } from '@jest/globals';
import { fetchData, saveDataToFile } from '../src/utils/helpers';

type ApiResponse = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

jest.mock('axios');
jest.spyOn(fs, 'writeFileSync');

describe('API Fetching and File Operations', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
        (console.error as jest.Mock).mockRestore();
    });
    const testUrl = 'https://jsonplaceholder.typicode.com/todos';
    const testFilename = 'testOutput.json';
    const mockData: ApiResponse[] = [
        { userId: 1, id: 1, title: 'Test Todo 1', completed: false },
        { userId: 1, id: 2, title: 'Test Todo 2', completed: true }
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetchData should return data from API', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
            data: mockData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { url: testUrl, method: 'get', headers: {}, params: {} }
        });
        
        const data = await fetchData(testUrl);
        expect(data).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(testUrl);
    });

    test('fetchData should handle API errors gracefully', async () => {
        const error = new Error('Network Error');
        (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(error);
        await expect(fetchData(testUrl)).rejects.toThrow('Error fetching data');
    });

    test('saveDataToFile should write data to a file', () => {
        saveDataToFile(mockData, testFilename);
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            expect.stringContaining(testFilename),
            JSON.stringify(mockData, null, 2),
            'utf-8'
        );
    });
});
