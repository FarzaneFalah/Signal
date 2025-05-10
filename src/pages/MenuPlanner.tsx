import {useEffect, useState} from 'react';
import { Form, Card, Row, Col,Spinner } from 'react-bootstrap';
import useDataLoader from "../hooks/useDataLoader.ts";
import {FoodGroup} from '../components';
import type { FoodGroupInterface, ServingRecommendationInterface } from '../types';
import {useLocation} from "react-router-dom"

export const MenuPlanner = () => {
    const { data: foodGroups, loading }   = useDataLoader('../../data/foodgroups-en_ONPP.json');
    const { data: servingRecommendations } = useDataLoader('../../data/servings_per_day-en_ONPP.json');
    const { data: directionalStatements } = useDataLoader('../../data/fg_directional_satements-en_ONPP.json');
    const { data: foodItems } = useDataLoader('../../data/foods-en_ONPP_rev.json');
    const [gender, setGender] = useState<string>('Female');
    const [ageRange, setAgeRange] = useState<string>('19 to 30');
    const [recommendations, setRecommendations] = useState<ServingRecommendationInterface[]>([]);
    const [fGroup, setFGroup] = useState<FoodGroupInterface[]>([]);

    const location = useLocation();


    const ageRanges = [
        '2 to 3', '4 to 8', '9 to 13', '14 to 18',
        '19 to 30', '31 to 50', '51 to 70', '71+'
    ];

    useEffect(() => {
        handleSubmit()
        console.log(location)
    }, [loading, location.key]);


    // useEffect(() => {
    //     console.log("Food Groups: ", foodGroups);
    //     console.log("Serving Recommendations: ", servingRecommendations);
    //     console.log("Directional Statements: ", directionalStatements);
    //     console.log("Food Items: ", foodItems);
    // },[foodGroups, servingRecommendations, directionalStatements, foodItems]);

    const handleSubmit = () => {
        // e.preventDefault();
        // Filter recommendations based on gender and age and remove duplicates
        const filtered = servingRecommendations.filter(
            (rec: ServingRecommendationInterface) => rec.gender === gender && rec.ages === ageRange
        );

        // Remove duplicates from filtered Food Groups
        const uniqueFoodGroups = foodGroups.filter((rec: FoodGroupInterface , index, self) =>
            index === self.findIndex((r: FoodGroupInterface) => (
                r.fgid === rec.fgid
            ))
        );
        setFGroup(uniqueFoodGroups);
        // console.log("Filtered Recommendations: ", uniqueFiltered);
        setRecommendations(filtered);
    };

    return (
        <div>
            <h2 className="mb-4">Personal Daily Menu Planner</h2>
            <Card className="mb-4">
                <Card.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="gender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={gender}
                                        onChange={(e) => {
                                            setGender(e.target.value)
                                            handleSubmit()
                                        }}
                                    >
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="ageRange">
                                    <Form.Label>Age Range</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={ageRange}
                                        onChange={(e) => {
                                            setAgeRange(e.target.value)
                                            handleSubmit()
                                        }}
                                    >
                                        {ageRanges.map(range => (
                                            <option key={range} value={range}>{range}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        {/*<Button variant="primary" type="submit" className="mt-3">*/}
                        {/*    Get Recommendations*/}
                        {/*</Button>*/}
                    </Form>
                </Card.Body>
            </Card>
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            {recommendations?.length > 0 && (
                <div>

                    <h3 className="mb-3">Your Daily Recommendations</h3>
                    {fGroup.map(group => (
                        <FoodGroup
                            key={group.fgid}
                            group={group}
                            recommendations={recommendations}
                            directionalStatements={directionalStatements}
                            foodItems={foodItems}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
