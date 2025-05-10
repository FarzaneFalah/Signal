import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, ListGroup, Badge, Accordion, Spinner } from 'react-bootstrap';
import useDataLoader from '../hooks/useDataLoader';
import type { FamilyMemberInterface, FoodGroupInterface, ServingRecommendationInterface, DirectionalStatementInterface, FoodItemInterface } from '../types';
import { FoodGroup } from '../components';

export const FamilyPlanner: React.FC = () => {
    const [familyMembers, setFamilyMembers] = useState<FamilyMemberInterface[]>([
        { id: '1', gender: 'Male', ageRange: '31 to 50' },     // Father
        { id: '2', gender: 'Female', ageRange: '31 to 50' },   // Mother
        { id: '3', gender: 'Male', ageRange: '9 to 13' },      // Boy
        { id: '4', gender: 'Female', ageRange: '4 to 8' },     // Girl
    ]);
    const [selectedMember, setSelectedMember] = useState<string>('1');

    const { data: foodGroups, loading }: { data: FoodGroupInterface[]; loading: boolean } = useDataLoader('../../data/foodgroups-en_ONPP.json');
    const { data: servingRecommendations }:{data: ServingRecommendationInterface[]} = useDataLoader('../../data/servings_per_day-en_ONPP.json');
    const { data: directionalStatements }:{data:DirectionalStatementInterface[]} = useDataLoader('../../data/fg_directional_satements-en_ONPP.json');
    const { data: foodItems }:{data:FoodItemInterface[]} = useDataLoader('../../data/foods-en_ONPP_rev.json');
    const [recommendations, setRecommendations] = useState<ServingRecommendationInterface[]>([]);
    const [fGroup, setFGroup] = useState<FoodGroupInterface[]>([]);

    const ageRanges = [
        '2 to 3', '4 to 8', '9 to 13', '14 to 18',
        '19 to 30', '31 to 50', '51 to 70', '71+'
    ];

    useEffect(() => {
        if (!loading) {
            updateRecommendations();
        }
    }, [selectedMember, familyMembers, loading, servingRecommendations, foodGroups]);

    const updateRecommendations = () => {
        const currentMember = familyMembers.find(member => member.id === selectedMember);

        if (!currentMember) return;

        // Filter recommendations based on gender and age
        const filtered = servingRecommendations.filter(
            (rec: ServingRecommendationInterface) =>
                rec.gender === currentMember.gender &&
                rec.ages === currentMember.ageRange
        );

        // Remove duplicates from Food Groups
        const uniqueFoodGroups = foodGroups.filter((rec: FoodGroupInterface, index, self) =>
            index === self.findIndex((r: FoodGroupInterface) => (
                r.fgid === rec.fgid
            ))
        );

        setFGroup(uniqueFoodGroups);
        setRecommendations(filtered);
    };

    const handleMemberUpdate = (id: string, field: keyof FamilyMemberInterface, value: string) => {
        setFamilyMembers(prevMembers =>
            prevMembers.map(member =>
                member.id === id ? { ...member, [field]: value } : member
            )
        );
    };

    const getFamilyMemberTitle = (member: FamilyMemberInterface) => {
        switch(member.id) {
            case '1': return 'Father';
            case '2': return 'Mother';
            case '3': return 'Child 1';
            case '4': return 'Child 2';
            default: return 'Family Member';
        }
    };

    const renderMemberList = () => (
        <ListGroup>
            {familyMembers.map(member => (
                <ListGroup.Item
                    key={member.id}
                    active={member.id === selectedMember}
                    action
                    onClick={() => setSelectedMember(member.id)}
                    className="d-flex justify-content-between align-items-center"
                >
                    <div>
                        <strong>{getFamilyMemberTitle(member)}</strong>
                        <div>
                            <Badge bg="info" className="me-1">{member.gender}</Badge>
                            <Badge bg="secondary">{member.ageRange}</Badge>
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );

    const renderMemberEditor = () => {
        const member = familyMembers.find(m => m.id === selectedMember);
        if (!member) return null;

        return (
            <Card>
                <Card.Header>
                    <h5>{getFamilyMemberTitle(member)} Settings</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                value={member.gender}
                                onChange={(e) => handleMemberUpdate(member.id, 'gender', e.target.value)}
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="ageRange">Age Range</Form.Label>
                            <Form.Control
                                as="select"
                                id="ageRange"
                                value={member.ageRange}
                                onChange={(e) => handleMemberUpdate(member.id, 'ageRange', e.target.value)}
                            >
                                {ageRanges.map(range => (
                                    <option key={range} value={range}>{range}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        );
    };

    return (
        <div>
            <h2 className="mb-4">Family Menu Planner</h2>
            <p>Customize nutrition recommendations for your entire family based on Canada's Food Guide.</p>

            <Row>
                <Col md={4} className="mb-4">
                    <Card className="mb-4">
                        <Card.Header>
                            <h4>Family Members</h4>
                        </Card.Header>
                        <Card.Body>
                            {renderMemberList()}
                        </Card.Body>
                    </Card>
                    {renderMemberEditor()}
                </Col>

                <Col md={8}>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : recommendations?.length > 0 && (
                        <div>
                            <Card className="mb-4">
                                <Card.Header>
                                    <h4>Dietary Recommendations for {getFamilyMemberTitle(familyMembers.find(m => m.id === selectedMember)!)}</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Serving Requirements Summary</Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup>
                                                    {recommendations.map((rec, idx) => (
                                                        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                                            <span>
                                                                {foodGroups.find((g: FoodGroupInterface) => g.fgid === rec.fgid)?.foodgroup}
                                                            </span>
                                                            <Badge bg="primary" pill>{rec.servings} servings</Badge>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card.Body>
                            </Card>

                            <h5 className="mb-3">Detailed Food Group Recommendations</h5>
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
                </Col>
            </Row>
        </div>
    );
};