import { Col, Row, Accordion} from 'react-bootstrap';
import FoodItem from './FoodItem';
import type {FoodGroupInterface, FoodItemInterface, ServingRecommendationInterface, DirectionalStatementInterface} from '../types'

interface FoodGroupProps {
    group: FoodGroupInterface;
    recommendations: ServingRecommendationInterface[],
    directionalStatements: DirectionalStatementInterface[],
    foodItems: FoodItemInterface[],
}

export const FoodGroup = ({ group, recommendations, directionalStatements, foodItems }: FoodGroupProps) => {
    const rec = recommendations.find(r => r.fgid === group.fgid);
    const statements = directionalStatements.filter(s => s.fgid === group.fgid);
    const items = foodItems.filter(item => item.fgid === group.fgid);

    if (!rec) return null;

    return (
        <Accordion className="mb-2" defaultActiveKey="0">
            <Accordion.Item eventKey={rec.fgid}>
            <Accordion.Header as={"h6"} className="text-capitalize">
                {group.foodgroup} - {rec.servings} servings
            </Accordion.Header>
            <Accordion.Body>
                {statements?.length > 0 && (
                    <div className="mb-3">
                        <h5>Directional Statements:</h5>
                        <ul>
                            {statements.map((statement, idx) => (
                                <li key={idx}>{statement.directional_statement}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <h5>Example Foods:</h5>
                <Row sm={1} md={2} lg={3}>
                    {items.slice(0, -1).map((item, idx) => (
                        <Col key={idx} className="mb-3">
                            <FoodItem item={item} />
                        </Col>
                    ))}
                </Row>
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};