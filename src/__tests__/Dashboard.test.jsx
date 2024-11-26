import React from "react";
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import Dashboard from "../components/Dashboard";
import { StateProvider } from "../StateProvider";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';


const queryClient = new QueryClient();

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve([
            {id: 101, title: 'foo', body: 'bar', userId: 1},
            {id: 102, title: 'fizz', body: 'buzz', userId: 2}
        ])
    })
)

describe('Dashboard Integration Test', () => {
    

    afterEach(() => {
        jest.resetAllMocks()
    })
    
    it('fetches posts successfully', async () => {
        // render(
        //     <StateProvider>
        //         <Dashboard />
        //     </StateProvider>
        // )

        render(
            <QueryClientProvider client={queryClient}>
                 <StateProvider>
                    <Dashboard />
                </StateProvider>
            </QueryClientProvider>
        )

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

        expect(await screen.findByText(/foo/i)).toBeInTheDocument()
        expect(await screen.findByText(/fizz/i)).toBeInTheDocument()
    })
})