import { Card } from 'react-bootstrap';
import type {FoodItemInterface} from '../types';

interface FoodItemProps {
    item: FoodItemInterface;
}

const FoodItem = ({ item }: FoodItemProps) => {
    // Helper function to get category color based on fgcat_id
    const getCategoryColor = (fgcat_id: string) => {
        switch(fgcat_id) {
            case "0": // Non dark green or orange vegetable
                return 'success';
            case "1": // Dark green vegetable
                return 'success';
            case "2": // Orange vegetable
                return 'warning';
            case "3": // Whole grain
                return 'info';
            case "4": // Whole grain
                return 'info';
            case "5": // Milk
                return 'primary';
            case "6": // Milk
                return 'primary';
            case "7": // Meat alternatives
                return 'danger';
            default:
                return 'secondary';
        }
    };

    return (
        <Card className="h-100" id={item.fgcat_id}>
            <Card.Body className="d-flex flex-column">
                <Card.Title className={`mb-3 fs-6 text-${getCategoryColor(item.fgcat_id)}`}>{item.food}</Card.Title>
                <Card.Subtitle
                    className="mb-2 text-muted"
                >
                    Serving Size: {item.srvg_sz}
                </Card.Subtitle>
                <div className="mt-auto">
                    <small className="fst-italic text-muted">
                        {item.fgcat_id === "0" && 'Non dark green or orange vegetable'}
                        {item.fgcat_id === "1" && 'Dark Green Vegetable'}
                        {item.fgcat_id === "2" && 'Orange Vegetable'}
                        {item.fgcat_id === "3" && 'Whole Grain'}
                        {item.fgcat_id === "4" && 'Refined Grain'}
                        {item.fgcat_id === "5" && 'Milk Product'}
                        {item.fgcat_id === "6" && 'Milk Alternative'}
                        {item.fgcat_id === "7" && 'Meat Alternative'}
                        {item.fgcat_id === "8" && 'Meat/Fish/Poultry'}
                    </small>
                </div>
            </Card.Body>
        </Card>
    );
};

export default FoodItem;