import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FamilyPlanner } from '../pages';
import useDataLoader from '../hooks/useDataLoader.ts';
import {vi} from "vitest";

// Mock the useDataLoader hook
vi.mock('../hooks/useDataLoader', () => ({
    __esModule: true,
    default: vi.fn()
}));

describe('FamilyPlanner Component', () => {
    const mockFoodGroups = [
        { fgid: '1', foodgroup: 'Vegetables and Fruits' },
        { fgid: '2', foodgroup: 'Grain Products' }
    ];

    const mockServingRecommendations = [
        { fgid: '1', gender: 'Male', ages: '31 to 50', servings: '8-10' },
        { fgid: '2', gender: 'Male', ages: '31 to 50', servings: '7' }
    ];

    beforeEach(() => {
        (useDataLoader as jest.Mock).mockImplementation((url) => {
            if (url.includes('foodgroups')) {
                return { data: mockFoodGroups, loading: false };
            } else if (url.includes('servings_per_day')) {
                return { data: mockServingRecommendations, loading: false };
            }
            return { data: [], loading: false };
        });
    });

    test('renders family planner with 4 family members', () => {
        render(<FamilyPlanner />);
        expect(screen.getByText('Family Menu Planner')).toBeInTheDocument();
        expect(screen.getByText('Father')).toBeInTheDocument();
        expect(screen.getByText('Mother')).toBeInTheDocument();
        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    test('allows selecting a different family member', async () => {
        render(<FamilyPlanner />);
        fireEvent.click(screen.getByText('Mother'));

    });

    test('allows updating family member details', async () => {
        render(<FamilyPlanner />);
        fireEvent.click(screen.getByText('Child 1'));
        const ageSelect = screen.getByLabelText('Age Range');
        fireEvent.change(ageSelect, { target: { value: '14 to 18' } });
        await waitFor(() => {
            expect(ageSelect).toHaveValue('14 to 18');
        });
    });
});